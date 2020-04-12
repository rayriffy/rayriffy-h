import { Collection } from '../../../core/@types'

export interface ActionsProps {
  collection: Collection
  setCollection: React.Dispatch<React.SetStateAction<Collection>>
}
