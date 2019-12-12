import { Reporter, Cache , NodePluginArgs} from 'gatsby'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'

declare function getData(actions: NodePluginArgs): Promise<IFetchedRaw[]>
