import fetch from 'isomorphic-unfetch'

export const customFetch = async <T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  const request = await fetch(input, init)
  const res: T = await request.json()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockres = res as any
  if (mockres.error === true) throw 'crash'

  return res
}
