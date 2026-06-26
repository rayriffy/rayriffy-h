import type { Language } from "@riffyh/commons";
import { Namespace } from "./constants/namespace";
import type { NiyaGallery } from "./types/NiyaGallery";

const languageMap: Record<string, Language> = {
  english: "en",
  chinese: "cn",
};

const languageKey = Object.keys(languageMap);

export const getLanugageByTags = (tags: NiyaGallery["tags"]): Language | null => {
  const languageTag = tags.find(
    (tag) => tag.namespace === Namespace.Language && languageKey.includes(tag.name),
  );

  if (languageTag) return languageMap[languageTag.name] || null;

  return null;
};
