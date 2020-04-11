import { ReactNode } from 'react'

export interface IProps {
  children?: ReactNode
  location: {
    pathname: string
  }
}
