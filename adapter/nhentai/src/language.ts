import type { Language } from "@riffyh/commons";

const languageMap: Record<number, Language> = {
  12227: "en",
  29963: "cn",
  6346: "jp",
};

const languageKey = Object.keys(languageMap);

export const getLanguageByTagId = (tagIds: number[]): Language | null => {
  const targetTagId = tagIds.find((id) => languageKey.includes(id.toString()));

  if (targetTagId) return languageMap[targetTagId] || null;

  return null;
};
