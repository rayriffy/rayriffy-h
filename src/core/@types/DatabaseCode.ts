export type DatabaseCode =
  | number
  | {
      code: number
      exclude: number[]
    }
