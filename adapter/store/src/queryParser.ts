import type { FilterQuery } from "mongoose";
import type { GalleryDocument } from "@riffyh/database";

export const parseQuery = (searchQuery: string | null): FilterQuery<GalleryDocument> => {
  if (!searchQuery || !searchQuery.trim()) {
    return {};
  }

  const conditions: FilterQuery<GalleryDocument>[] = [];

  const regex = /(-)?(?:([a-zA-Z0-9_-]+):)?(?:"([^"]+)"|(\S+))/g;
  let match;

  while ((match = regex.exec(searchQuery)) !== null) {
    const isExclude = match[1] === "-";
    const namespace = match[2];
    const value = match[3] || match[4];

    if (!value) continue;

    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeValue = escapeRegex(value);

    let condition: any = {};

    if (namespace === "pages") {
      const pageMatch = value.match(/^(>=|<=|>|<)?(\d+)$/);
      if (pageMatch) {
        const op = pageMatch[1] || "";
        const num = parseInt(pageMatch[2] || "0", 10);
        const mongoOp =
          op === ">="
            ? "$gte"
            : op === "<="
              ? "$lte"
              : op === ">"
                ? "$gt"
                : op === "<"
                  ? "$lt"
                  : "$eq";

        condition = { $expr: { [mongoOp]: [{ $size: "$pages" }, num] } };
      } else {
        continue;
      }
    } else if (namespace) {
      const type = namespace.endsWith("ies")
        ? namespace.slice(0, -3) + "y"
        : namespace.endsWith("s")
          ? namespace.slice(0, -1)
          : namespace;

      condition = {
        tags: {
          $elemMatch: {
            type: type,
            name: { $regex: safeValue, $options: "i" },
          },
        },
      };
    } else {
      condition = {
        $or: [
          { "title.display": { $regex: safeValue, $options: "i" } },
          { "title.original": { $regex: safeValue, $options: "i" } },
          { "tags.name": { $regex: safeValue, $options: "i" } },
        ],
      };
    }

    if (isExclude) {
      conditions.push({ $nor: [condition] });
    } else {
      conditions.push(condition);
    }
  }

  if (conditions.length === 0) {
    return {};
  }

  return { $and: conditions };
};
