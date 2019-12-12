import { Reporter, Cache , NodePluginArgs} from 'gatsby'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'

declare function getRawData(id: number, exclude: number[], actions: NodePluginArgs): Promise<IFetchedRaw>
