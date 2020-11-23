import { original } from './original'

import { data2020_11 } from './months/2020-11'

import { DatabaseCode } from '../@types/DatabaseCode'

export const codes: DatabaseCode[] = original.concat(data2020_11)
