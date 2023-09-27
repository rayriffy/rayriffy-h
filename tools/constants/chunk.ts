export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i: number) =>
    arr.slice(i * size, i * size + size)
  )
