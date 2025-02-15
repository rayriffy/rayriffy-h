import PQueue from "p-queue";
import { fetchHentai } from "./fetchHentai";
import type { FetchResult } from "../@types/FetchResult";

const fetchQueue = new PQueue({
  concurrency: 8,
})

export const getGalleriesViaFetch = async (codes: (string | number)[]): Promise<FetchResult> => {
  let success = 0
  let failure = 0

  if (codes.length === 0)
    return {
      success,
      failure
    }

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
