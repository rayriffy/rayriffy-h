export type DatabaseCode =
  | string
  | number
  | {
      code: number
      exclude: number[]
    }
