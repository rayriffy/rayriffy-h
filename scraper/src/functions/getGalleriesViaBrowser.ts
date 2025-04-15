import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import PQueue from "p-queue";
import type { Browser } from "puppeteer";
import kebabCase from 'lodash/kebabCase'
import { writeItem } from "./writeItem";
import type { FetchResult } from "../@types/FetchResult";
import { Hentai } from '@riffyh/commons';

const concurrency = Number(process.env.FETCH_CONCURRENCY) || 8

const fetchQueue = new PQueue({
  concurrency,
})

export const getGalleriesViaBrowser = async (codes: (string | number)[]): Promise<FetchResult> => {
  const [firstGallery, ...galleries] = codes

  let success = 0
  let failure = 0

  if (codes.length === 0)
    return {
      success,
      failure
    }

  puppeteer.use(StealthPlugin())
  const browser = await puppeteer
    .use(StealthPlugin())
    .launch({
      headless: false,
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

  const sanitizedContent = {
    id: Number(content.id),
    media_id: content.media_id,
    title: content.title,
    images: {
      cover: content.images.cover,
      pages: content.images.pages,
    },
    tags: content.tags.map(o => ({
      id: kebabCase(o.name),
      type: o.type,
      name: o.name,
    })),
    num_pages: content.num_pages,
  }

  await writeItem(code, JSON.stringify(sanitizedContent))
}
