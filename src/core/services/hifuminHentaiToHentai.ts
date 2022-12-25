import kebabCase from 'lodash/kebabCase'

import type { Hentai } from '../@types/Hentai'
import type { Image } from '../@types/Image'
import type { HifuminHentai } from '../@types/HifuminHentai'
import type { HifuminImage } from '../@types/HifuminImage'
import type { HifuminTag } from '../@types/HifuminTag'
import type { Tag } from '../@types/Tag'
import type { TagType } from '../@types/TagType'

const hifuminImageToImage = (hifuminImage: HifuminImage): Image => ({
  t: hifuminImage.info.type[0] as 'j' | 'p' | 'g',
  w: hifuminImage.info.width,
  h: hifuminImage.info.height,
})

const hifuminTagToTag = (hifuminTag: HifuminTag, tagType: TagType): Tag => ({
  id: kebabCase(hifuminTag.name),
  type: tagType,
  name: hifuminTag.name,
})

export const hifuminHentaiToHentai = (hentai: HifuminHentai): Hentai => {
  return {
    id: hentai.id,
    media_id: hentai.info.mediaId,
    title: {
      english: hentai.title.english,
      japanese: hentai.title.japanese,
      pretty: hentai.title.display,
    },
    images: {
      cover: hifuminImageToImage(hentai.images.cover),
      pages: hentai.images.pages.map(o => hifuminImageToImage(o)),
    },
    tags: [
      ...hentai.metadata.artists.map(o => hifuminTagToTag(o, 'artist')),
      ...hentai.metadata.categories.map(o => hifuminTagToTag(o, 'category')),
      ...hentai.metadata.characters.map(o => hifuminTagToTag(o, 'character')),
      ...hentai.metadata.groups.map(o => hifuminTagToTag(o, 'group')),
      ...hentai.metadata.parodies.map(o => hifuminTagToTag(o, 'parody')),
      ...hentai.metadata.tags.map(o => hifuminTagToTag(o, 'tag')),
      {
        id: kebabCase(hentai.metadata.language),
        type: 'language',
        name: hentai.metadata.language,
      },
    ],
    num_pages: hentai.images.pages.length,
  }
}
