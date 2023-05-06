import kebabCase from 'lodash.kebabcase'

import type { Hentai } from '../src/core/@types/Hentai'

export const backupFetch = async (id: string | number): Promise<Hentai> => {
  const data = await fetch(`https://nhentai.net/api/gallery/${id}`).then(o => {
    if (o.ok)
      return o.json() as Promise<Hentai>
    else
      throw o
  })

  return {
    id: data.id,
    media_id: data.media_id,
    title: data.title,
    images: {
      cover: data.images.cover,
      pages: data.images.pages,
    },
    tags: data.tags.map(o => ({
      id: kebabCase(o.name),
      type: o.type,
      name: o.name,
    })),
    num_pages: data.num_pages,
  }
}
