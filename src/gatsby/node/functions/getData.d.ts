import { Cache, NodePluginArgs, Reporter } from 'gatsby'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'

declare function getData(actions: NodePluginArgs): Promise<IFetchedRaw[]>
