import { data2024_01 } from './2024-01'
import { data2024_02 } from './2024-02'

import type { DatabaseCode } from '$core/@types/DatabaseCode'

export const year2024 = ([] as DatabaseCode[])
  .concat(data2024_01)
  .concat(data2024_02)
