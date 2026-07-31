import type { GalleryMetadata } from "./types";

const languages = {
  chinese: "cn",
  english: "en",
  japanese: "jp",
  korean: "kr",
  thai: "th",
} as const;

export const getLanguage = (metadata: GalleryMetadata) => {
  const languageTag = metadata.tags.find((tag) => tag.startsWith("language:"));
  if (!languageTag) return null;

  const language = languageTag.slice("language:".length).toLowerCase();
  return languages[language as keyof typeof languages] ?? null;
};
