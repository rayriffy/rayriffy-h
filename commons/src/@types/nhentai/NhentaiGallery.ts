import { NhentaiImage } from "./NhentaiImage"
import { NhentaiTag } from "./NhentaiTag"

export interface NhentaiGallery {
    id: number
    media_id: string
    title: {
        english: string
        japanese: string
        pretty: string
    }
    cover: NhentaiImage
    tags: NhentaiTag[]
    num_pages: number
    num_favorites: number
    pages: NhentaiImage[]
}
