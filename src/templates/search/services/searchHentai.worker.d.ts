import { IHentai } from '../../../core/@types/IHentai'

declare function searchHentai(query: string, raws: IHentai[]): Promise<IHentai[]>
