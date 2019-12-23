import { ICollection } from '../../../core/@types/ICollection'

export interface IActionsProps {
  collection: ICollection
  setCollection: React.Dispatch<React.SetStateAction<ICollection>>
}
