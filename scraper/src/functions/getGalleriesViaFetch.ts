import PQueue from "p-queue";
import { fetchHentai } from "./fetchHentai";
import type { FetchResult } from "../@types/FetchResult";

export const getGalleriesViaFetch = async (
  codes: (string | number)[],
  concurrency: number = Number(process.env.FETCH_CONCURRENCY) || 8
): Promise<FetchResult> => {
  let success = 0
  let failure = 0

  if (codes.length === 0)
    return {
      success,
      failure
    }

  const fetchQueue = new PQueue({
    concurrency,
  })

  await Promise.all(
    codes.map(code =>
      fetchQueue.add(() =>
        fetchHentai(code)
          .then(() => success++)
          .catch(() => failure++)
      )
    )
  )

  await fetchQueue.onIdle()

  return {
    success,
    failure
  }
}
