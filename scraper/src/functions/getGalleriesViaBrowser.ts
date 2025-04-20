import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import PQueue from "p-queue";
import type { Browser } from "puppeteer";
import { writeItem } from "./writeItem";
import type { FetchResult } from "../@types/FetchResult";
import { sanitizeContent, type Hentai } from '@riffyh/commons';

export const getGalleriesViaBrowser = async (
  codes: (string | number)[], 
  headless: boolean = false,
  concurrency: number = Number(process.env.FETCH_CONCURRENCY) || 8
): Promise<FetchResult> => {
  const [firstGallery, ...galleries] = codes

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

  puppeteer.use(StealthPlugin())
  const browser = await puppeteer
    .use(StealthPlugin())
    .launch({
      headless: headless,
      defaultViewport: {
        width: 1190,
        height: 700
      },
      targetFilter: target => target.type() !== 'other'
    })

  // get first by itself first
  await getItem(firstGallery, browser)
    .then(() => success++)
    .catch(() => failure++)
  await Promise.all(
    galleries.map(gallery =>
      fetchQueue.add(() =>
        getItem(gallery, browser)
          .then(() => success++)
          .catch(() => failure++)
      )
    )
  )

  await fetchQueue.onIdle()
  await browser.close()

  return {
    success,
    failure
  }
}

const getItem = async (code: string | number, browser: Browser) => {
  const page = await browser.newPage()
  await page.goto(`https://nhentai.net/api/gallery/${code}`, {
    waitUntil: 'networkidle0',
  })

  // if hit cloudflare, then maybe wait faster?
  if ((await page.title()).toLowerCase().includes('just a moment'))
    await page.waitForNetworkIdle()

  let content: Hentai = JSON.parse((await page.$eval('pre', el => el.textContent))!)
  await page.close()

  // @ts-expect-error
  if (typeof content.error === 'string') {
    // @ts-expect-error
    throw Error(`${code} has error: ${content.error}`)
  }

  await writeItem(code, JSON.stringify(sanitizeContent(content)))
}
