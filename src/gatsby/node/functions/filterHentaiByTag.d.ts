import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'
import { ITag } from '../../../core/@types/ITag'

declare function filterHentaiByTag(healthyResults: IFetchedRaw[], tag: ITag): Promise<IFetchedRaw[]>
