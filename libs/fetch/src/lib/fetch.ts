import unfetch from 'isomorphic-unfetch'

export const fetch = async <T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  const res: T = await unfetch(input, init).then(o => {
    try {
      return o.json()
    } catch {
      return o
    }
  })

  return res
}
