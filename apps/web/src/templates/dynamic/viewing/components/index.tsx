import React, { useEffect, useState } from 'react'

import { Reader } from '../../../../core/components/reader'
import { Failed } from './failed'
import { Guide } from './guide'
import { Loading } from './loading'

import { getHentai } from '../services/getHentai'
import { getIdByUrl } from '../services/getIdByUrl'

import { FetchedRaw } from '../../../../core/@types/FetchedRaw'
import { Props } from '../@types/Props'

import { useStoreon } from '../../../../store'

const DynamicViewingComponent: React.FC<Props> = props => {
  const { location } = props

  const [state, setState] = useState<number>(1)
  const [raw, setRaw] = useState<FetchedRaw | null>(null)

  const { dispatch } = useStoreon('subtitle')

  const fetchHentai = async (requestedId: number | string) => {
    setState(1)
    dispatch('subtitle/setSubtitle', 'finding')

    try {
      const data = await getHentai(requestedId)

      setRaw(data)
      setState(0)
      dispatch('subtitle/setSubtitle', 'viewing')
    } catch (e) {
      setState(2)
      dispatch('subtitle/setSubtitle', 'failed')

      throw e
    }
  }

  useEffect(() => {
    const id = getIdByUrl(location.pathname)

    if (id !== null) {
      fetchHentai(id)
    } else {
      setState(3)
    }
  }, [])

  return state === 0 && raw !== null ? (
    <Reader raw={raw.data} internal={false} />
  ) : state === 1 && raw === null ? (
    <Loading />
  ) : state === 2 ? (
    <Failed />
  ) : state === 3 ? (
    <Guide />
  ) : null
}

export default DynamicViewingComponent
