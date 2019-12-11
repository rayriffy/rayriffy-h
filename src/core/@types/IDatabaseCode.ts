export type IDatabaseCode =
  | number
  | {
      code: number
      exclude: number[]
    }
