export const fetch = async <T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  try {
    const res: T = await fetch(input, init).then(o => o.json())

    return res
  } catch (e) {
    throw e
  }
}
