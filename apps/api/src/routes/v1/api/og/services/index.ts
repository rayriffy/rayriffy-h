import express from 'express'

import { APIResponse } from '@rayriffy-h/helper'

import puppeteer from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

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
    await page.waitForTimeout(500)
    // await page.waitForNavigation({
    //   waitUntil: 'networkidle2',
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
