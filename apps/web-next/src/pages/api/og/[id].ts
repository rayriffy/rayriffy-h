import { NextApiHandler } from 'next'

import puppeteer from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

const api: NextApiHandler = async (req, res) => {
  const { id } = req.query

  await chrome.font(
    'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@master/hinted/ttf/NotoSans/NotoSans-Regular.ttf'
  )
  await chrome.font(
    'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@master/hinted/ttf/NotoSans/NotoSans-Medium.ttf'
  )
  await chrome.font(
    'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@master/hinted/ttf/NotoSans/NotoSans-SemiBold.ttf'
  )
  await chrome.font(
    'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@master/hinted/ttf/NotoSans/NotoSans-Bold.ttf'
  )

  const browser = await puppeteer.launch({
    headless: true,
    args: chrome.args,
    executablePath:
      (await chrome.executablePath) || '/usr/bin/chromium-browser',
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1200,
    height: 630,
  })

  await page.goto(`https://h.rayriffy.com/og/${id}`)
  await page.waitForTimeout(1000)

  const raw = await page.screenshot({
    type: 'jpeg',
    quality: 100,
  })

  await browser.close()

  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')
  res.setHeader('Content-Type', 'image/jpeg')
  res.end(raw)
}

export default api
