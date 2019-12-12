import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'
import { ITag } from '../../../core/@types/ITag'

declare function filterTag(nodes: IFetchedRaw[], tag: ITag): Promise<ITag[]>
