import { Cache, NodePluginArgs, Reporter } from 'gatsby'

import { IFetchedRaw } from '../../../core/@types'

declare function getData(actions: NodePluginArgs): Promise<IFetchedRaw[]>
