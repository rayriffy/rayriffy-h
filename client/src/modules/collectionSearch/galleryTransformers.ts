import type { Gallery } from "@riffyh/commons";
import { TagType } from "@riffyh/commons";

// ---------------- Advanced search (parser + matcher) ----------------

type PagesOperator = "gt" | "gte" | "lt" | "lte" | "eq";

export interface ParsedAdvancedSearch {
  include: Array<{
    scope: "any" | "tag";
    tagType?: TagType;
    term: string;
  }>;
  exclude: Array<{
    scope: "any" | "tag";
    tagType?: TagType;
    term: string;
  }>;
  pages: Array<{ op: PagesOperator; value: number }>;
}

const namespaceToTagType: Record<string, TagType> = {
  parody: TagType.Parody,
  parodies: TagType.Parody,
  tag: TagType.Tag,
  tags: TagType.Tag,
  language: TagType.Language,
  languages: TagType.Language,
  character: TagType.Character,
  characters: TagType.Character,
  group: TagType.Group,
  groups: TagType.Group,
  artist: TagType.Artist,
  artists: TagType.Artist,
  category: TagType.Category,
  categories: TagType.Category,
};

const normalizeString = (value: unknown): string => String(value ?? "").toLowerCase();

const parsePagesConstraint = (value: string): { op: PagesOperator; value: number } | null => {
  let op: PagesOperator = "eq";
  let numStr = value;

  if (value.startsWith(">=")) {
    op = "gte";
    numStr = value.slice(2);
  } else if (value.startsWith("<=")) {
    op = "lte";
    numStr = value.slice(2);
  } else if (value.startsWith(">")) {
    op = "gt";
    numStr = value.slice(1);
  } else if (value.startsWith("<")) {
    op = "lt";
    numStr = value.slice(1);
  }

  const num = parseInt(numStr, 10);
  if (isNaN(num)) return null;
  return { op, value: num };
};

/**
 * Parse an advanced local search query.
 * Supports:
 * - multiple terms (AND)
 * - exclusion with leading '-'
 * - quoted phrases
 * - tag namespaces (e.g., parodies:, tag:, artist:, ...)
 * - pages constraints (pages:20, pages:>20, pages:<=30)
 */
export const parseAdvancedSearch = (query: string): ParsedAdvancedSearch => {
  const result: ParsedAdvancedSearch = { include: [], exclude: [], pages: [] };
  if (!query || !query.trim()) return result;

  // Tokenizer: [-]?[namespace:]? (quoted phrase | token)
  const tokenRe = /(-)?(?:(\w+):)?(?:"([^"]+)"|([^\s]+))/g;
  let match: RegExpExecArray | null;
  while ((match = tokenRe.exec(query)) !== null) {
    const isExclusion = !!match[1];
    const namespace = match[2]?.toLowerCase();
    const quoted = match[3];
    const bare = match[4];
    const rawValue = quoted ?? bare ?? "";
    const value = normalizeString(rawValue);
    if (!value) continue;

    // pages constraint
    if (namespace === "pages") {
      const constraint = parsePagesConstraint(value);
      if (constraint) result.pages.push(constraint);
      continue;
    }

    const entry = {
      scope: "any" as const,
      term: value,
    };

    // tag namespaces
    if (namespace && namespaceToTagType[namespace]) {
      const tagged = {
        scope: "tag" as const,
        tagType: namespaceToTagType[namespace],
        term: value,
      };
      (isExclusion ? result.exclude : result.include).push(tagged);
      continue;
    }

    // generic namespace is treated as ANY (title + tags + id)
    (isExclusion ? result.exclude : result.include).push(entry);
  }

  return result;
};

const getGenericSearchFields = (gallery: Omit<Gallery, "pages">): string[] => {
  return [
    gallery.id,
    gallery.title.display,
    gallery.title.original,
    ...gallery.tags.map((t) => t.name),
  ]
    .filter((o) => typeof o === "string")
    .map(normalizeString);
};

const anyStringIncludes = (fields: string[], term: string): boolean => {
  return fields.some((f) => f.includes(term));
};

const getTagFieldsByType = (gallery: Omit<Gallery, "pages">, tagType: TagType): string[] => {
  return gallery.tags.filter((t) => t.type === tagType).map((t) => normalizeString(t.name));
};

/**
 * Match a gallery item against a parsed advanced query, with optional globally filtered tags.
 */
export const galleryMatchesAdvancedSearch = (
  gallery: Omit<Gallery, "pages">,
  parsed: ParsedAdvancedSearch,
): boolean => {
  // 1) Exclusions
  const genericFields = getGenericSearchFields(gallery);
  for (const ex of parsed.exclude) {
    if (ex.scope === "any") {
      if (anyStringIncludes(genericFields, ex.term)) return false;
    } else if (ex.scope === "tag" && ex.tagType) {
      const tagFields = getTagFieldsByType(gallery, ex.tagType);
      if (anyStringIncludes(tagFields, ex.term)) return false;
    }
  }

  // 2) Inclusions (AND semantics; empty means pass)
  for (const inc of parsed.include) {
    if (inc.scope === "any") {
      if (!anyStringIncludes(genericFields, inc.term)) return false;
    } else if (inc.scope === "tag" && inc.tagType) {
      const tagFields = getTagFieldsByType(gallery, inc.tagType);
      if (!anyStringIncludes(tagFields, inc.term)) return false;
    }
  }

  return true;
};

/**
 * Merge user query with persistent filteredTags by converting them into
 * exclusion terms and combining with the parsed query.
 */
export const buildMergedAdvancedSearch = (
  query: string,
  filteredTags: string[] = [],
): ParsedAdvancedSearch => {
  const base = parseAdvancedSearch(query);
  if (!filteredTags.length) return base;

  // Transform filters like ["tag:big", "language:japanese"] into
  // a negative query: "-tag:big -language:japanese"
  const negativeQuery = filteredTags
    .filter((s) => (s ?? "").toString().trim() !== "")
    .map((s) => `-${s}`)
    .join(" ");

  const parsedFilters = parseAdvancedSearch(negativeQuery);

  return {
    include: [...base.include, ...parsedFilters.include],
    exclude: [...base.exclude, ...parsedFilters.exclude],
    // Do not inherit any pages constraint from filteredTags
    pages: base.pages,
  };
};

/**
 * Check if a gallery matches search queries and filter criteria
 * @param gallery Gallery object to check
 * @param queries Search queries split into words
 * @param filteredTags Tags to exclude
 * @returns Whether the gallery matches the search criteria
 */
export const galleryMatchesSearch = (
  gallery: Gallery,
  queries: string[],
  filteredTags: string[] = [],
): boolean => {
  return (
    // item must not contain filtered tags
    gallery.tags.map((t) => t.name.toLowerCase()).every((t) => !filteredTags.includes(t)) &&
    // items must match some of queries
    queries.every((query) => {
      return [
        gallery.id,
        gallery.title.display,
        gallery.title.original,
        ...gallery.tags.map((o) => o.name),
      ]
        .map((o) => String(o ?? "").toLowerCase())
        .some((o) => o.includes(query));
    })
  );
};
