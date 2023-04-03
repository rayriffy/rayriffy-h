import { data2023_01 } from './2023-01'
import { data2023_02 } from './2023-02'
import { data2023_03 } from './2023-03'
import { data2023_04 } from './2023-04'

import type { DatabaseCode } from '$core/@types/DatabaseCode'

export const year2023 = ([] as DatabaseCode[])
  .concat(data2023_01)
  .concat(data2023_02)
  .concat(data2023_03)
  .concat(data2023_04)
