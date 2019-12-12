import { IFavorite } from '../../../core/@types/IFavorite'

export interface IActionsProps {
  fetchedCollection: IFavorite[]
  setCollection: React.Dispatch<React.SetStateAction<string>>
}
