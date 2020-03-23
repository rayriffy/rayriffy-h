import { ICollection } from '../../../core/@types'

export interface IActionsProps {
  collection: ICollection
  setCollection: React.Dispatch<React.SetStateAction<ICollection>>
}
