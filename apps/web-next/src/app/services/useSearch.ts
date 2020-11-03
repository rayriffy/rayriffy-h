import { SearchCache, useStoreon, Event } from '@rayriffy-h/state-engine'
import { StoreonDispatch } from 'storeon'

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
