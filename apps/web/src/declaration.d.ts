/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

import 'react'
import { HTMLAttributes } from 'react'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy'
  }

  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    enterkeyhint: string
  }
}
