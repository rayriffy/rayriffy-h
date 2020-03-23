import { Cache, NodePluginArgs, Reporter } from 'gatsby'

import { IFetchedRaw } from '../../../core/@types'

declare function getRawData(
  id: number,
  exclude: number[],
  actions: NodePluginArgs
): Promise<IFetchedRaw>
