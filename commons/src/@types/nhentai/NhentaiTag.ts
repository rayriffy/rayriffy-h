import { TagType } from "../TagType"

export interface NhentaiTag {
    id: number
    type: TagType
    name: string
    slug: string
    url: string
    count: number
}