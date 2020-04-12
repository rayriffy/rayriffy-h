import { ReactNode } from 'react'

export interface Props {
  children?: ReactNode
  location: {
    pathname: string
  }
}
