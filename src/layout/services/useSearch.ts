import { StoreonDispatch } from 'storeon'

import { useStoreon } from '../../context'
import { Event } from '../../context/storeon'

import { SearchCache } from '../../context/@types/SearchStore'

interface UseSearch extends SearchCache {
  dispatch: StoreonDispatch<Event>
}

export const useSearch = (mode: string): UseSearch => {
  const { search, dispatch } = useStoreon('search')

  return {
    ...search[mode],
    dispatch,
  }
}
