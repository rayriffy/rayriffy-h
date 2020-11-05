import { concat } from 'lodash'

import { original } from './original'

import { data2020_11 } from './months/2020-11'

import { DatabaseCode } from '../@types/DatabaseCode'

export const codes: DatabaseCode[] = concat(original, data2020_11)
