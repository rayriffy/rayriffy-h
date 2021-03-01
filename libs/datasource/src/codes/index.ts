import { original } from './original'

import { data2020_11 } from './months/2020-11'
import { data2020_12 } from './months/2020-12'
import { data2021_01 } from './months/2021-01'
import { data2021_02 } from './months/2021-02'
import { data2021_03 } from './months/2021-03'

import { DatabaseCode } from '../@types/DatabaseCode'

export const codes: DatabaseCode[] = original
  .concat(data2020_11)
  .concat(data2020_12)
  .concat(data2021_01)
  .concat(data2021_02)
  .concat(data2021_03)
