import { fetch } from '@rayriffy-h/fetch'

export const getCover = async (id: string) => {
  const res = await fetch<{
    media_id: string
    images: {
      cover: {
        t: 'j' | 'p' | 'g'
      }
    }
  }>(`https://opener.now.sh/api/data/${id}`)

  return `https://t.nhentai.net/galleries/${res.media_id}/cover.${
    res.images.cover.t === 'p' ? 'png' : res.images.cover.t === 'j' ? 'jpg' : 'gif'
  }`
}
