import { NextApiHandler } from 'next'

import playwright from 'playwright-aws-lambda'

const api: NextApiHandler = async (req, res) => {
  const { id } = req.query

  const browser = await playwright.launchChromium()
  const page = await browser.newPage()
  await page.setViewportSize({
    width: 1200,
    height: 630,
  })

  await page.goto(`https://h.rayriffy.com/og/${id}`)
  await page.waitForTimeout(1000)
  // await page.waitForNavigation({
  //   waitUntil: 'networkidle',
  // })
  // await page.waitForNavigation()
  // await page.waitForSelector('#image-cover')
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
