import { TagType } from "@riffyh/commons";
import { Namespace } from "./namespace";

export const tagTypeMap: Record<number, TagType> = {
  [Namespace.Artist]: TagType.Artist,
  [Namespace.Circle]: TagType.Artist,
  [Namespace.Parody]: TagType.Parody,
  [Namespace.Magazine]: TagType.Group,
  [Namespace.Character]: TagType.Character,
  [Namespace.Cosplayer]: TagType.Character,
  [Namespace.Uploader]: TagType.Tag,
  [Namespace.Male]: TagType.Tag,
  [Namespace.Female]: TagType.Tag,
  [Namespace.Mixed]: TagType.Tag,
  [Namespace.Language]: TagType.Language,
  [Namespace.Other]: TagType.Tag,
  [Namespace.Reclass]: TagType.Tag,
};
