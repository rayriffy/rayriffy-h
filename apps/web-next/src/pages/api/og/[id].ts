import { NextApiHandler } from 'next'

import { webkit } from 'playwright'

const api: NextApiHandler = async (req, res) => {
  const { id } = req.query

  const browser = await webkit.launch({
    headless: true,
  })
  const page = await browser.newPage()
  await page.setViewportSize({
    width: 1200,
    height: 630,
  })

  await page.goto(`https://h.rayriffy.com/og/${id}`)
  await page.waitForNavigation({
    waitUntil: 'networkidle',
  })
  // await page.waitForNavigation()
  // await page.waitForSelector('#image-cover')
  const raw = await page.screenshot({
    type: 'jpeg',
    quality: 100,
  })

  await browser.close()

  res.setHeader('Content-Type', 'image/jpeg')
  res.end(raw)
}

export default api
