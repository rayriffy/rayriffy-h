import { data2023_01 } from './2023-01'
import { data2023_02 } from './2023-02'

import type { DatabaseCode } from '../../../@types/DatabaseCode'

export const year2023 = ([] as DatabaseCode[])
  .concat(data2023_01)
  .concat(data2023_02)
