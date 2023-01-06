import { data2020_11 } from './2020-11'
import { data2020_12 } from './2020-12'

import type { DatabaseCode } from '../../../@types/DatabaseCode'

export const year2020 = ([] as DatabaseCode[])
  .concat(data2020_11)
  .concat(data2020_12)
