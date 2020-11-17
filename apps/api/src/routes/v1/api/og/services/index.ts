import express from 'express'

import { APIResponse } from '@rayriffy-h/helper'

import * as playwright from 'playwright-aws-lambda'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

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

    res.setHeader('Content-Type', 'image/jpeg')
    res.end(raw)
  } catch (e) {
    console.error(e)

    const response: APIResponse<never> = {
      status: 'failed',
      code: 500,
      response: {
        message: 'internal error',
      },
    }

    res.status(500).send(response)
  }
})

router.all('/:id', (_, res) => {
  const response: APIResponse<never> = {
    status: 'failed',
    code: 404,
    response: {
      message: 'invalid method',
    },
  }

  res.status(405).send(response)
})

export default router
