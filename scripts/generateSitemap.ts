import * as fs from 'fs'
import * as path from 'path'

import { SitemapStream, streamToPromise } from 'sitemap'

import { Hentai } from '../libs/helper/src'

const nextDir = path.join(process.cwd(), '.next')
const publicDir = path.join(process.cwd(), 'public')

;(async () => {
  if (!fs.existsSync(nextDir) || !fs.existsSync(publicDir)) return

  const sitemapStream = new SitemapStream({
    hostname: 'https://h.rayriffy.com',
  })

  // home page
  sitemapStream.write({
    url: '',
    changefreq: 'daily',
    priority: 0.7,
  })

  // all galleries
  const galleries: Hentai[] = JSON.parse(
    fs.readFileSync(path.join(publicDir, 'static', 'searchKey.json')).toString()
  )
  galleries.map(gallery =>
    sitemapStream.write({
      url: `/g/${gallery.id}`,
      changefreq: 'daily',
      priority: 0.7,
    })
  )

  // end stream
  sitemapStream.end()

  // write file
  const sitemap = await streamToPromise(sitemapStream).then(sm => sm.toString())

  await Promise.all(
    [
      (path.join(nextDir, 'public', 'sitemap.xml'),
      path.join(publicDir, 'sitemap.xml')),
    ].map(async targetPath =>
      fs.writeFileSync(targetPath, JSON.stringify(sitemap))
    )
  )
})()
