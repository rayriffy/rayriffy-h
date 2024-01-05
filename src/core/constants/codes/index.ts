import { original } from './original'

import { year2020 } from './2020'
import { year2021 } from './2021'
import { year2022 } from './2022'
import { year2023 } from './2023'
import { year2024 } from './2024'

import type { DatabaseCode } from '../../@types/DatabaseCode'

export const codes: DatabaseCode[] = original
  .concat(year2020)
  .concat(year2021)
  .concat(year2022)
  .concat(year2023)
  .concat(year2024)
