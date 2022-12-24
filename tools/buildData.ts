import fs from 'fs'
import path from 'path'

import dotenv from 'dotenv'
import { kebabCase } from 'lodash'

import { codes } from '../src/core/constants/codes'

import { Hentai } from '../src/core/@types/Hentai'
import { Tag } from '../src/core/@types/Tag'
import { promiseBrotliCompress } from '../src/core/services/promiseBrotliCompress'

dotenv.config()

const nextCacheDirectory = path.join(__dirname, '..', '.next', 'cache')
const hentaiDirectory = path.join(nextCacheDirectory, 'hentai')

;(async () => {
  // merging those into one searchKey
  console.log('post-processing')
  const targetSearchKey = path.join(
    __dirname,
    '../public/static',
    'searchKey.opt'
  )

  const orderedHentai = codes
    .map(code => {
      try {
        const targetCode = typeof code === 'number' ? code : code.code
        const targetHentai: Hentai = JSON.parse(
          fs
            .readFileSync(path.join(hentaiDirectory, `${targetCode}.json`))
            .toString()
        )

        const transformedHentai: Hentai = {
          ...targetHentai,
          images: {
            ...targetHentai.images,
            pages: [],
          },
        }

        return transformedHentai
      } catch (e) {
        return null
      }
    })
    .filter(o => o !== null)

  const compressedBuffer = await promiseBrotliCompress(
    Buffer.from(JSON.stringify(orderedHentai))
  )
  await fs.promises.writeFile(targetSearchKey, compressedBuffer)

  // searchKey by tag
  const tagPool: Tag[] = []
  orderedHentai.map(hentai => {
    hentai.tags.map(tag => {
      const targetTagPool = tagPool.find(pool => pool.id === tag.id)

      if (!targetTagPool) {
        tagPool.push(tag)
      }
    })
  })

  const rootKeyDirectory = path.join(__dirname, '../public/static/key')

  if (!fs.existsSync(rootKeyDirectory)) {
    await fs.promises.mkdir(rootKeyDirectory, { recursive: true })
  }

  await Promise.all(
    tagPool.map(async tag => {
      const targetTagFile = path.join(
        rootKeyDirectory,
        `${kebabCase(tag.name)}.opt`
      )

      const compressedBuffer = await promiseBrotliCompress(
        Buffer.from(
          JSON.stringify(
            orderedHentai.filter(o => o.tags.find(t => t.id === tag.id))
          )
        )
      )
      await fs.promises.writeFile(targetTagFile, compressedBuffer)
    })
  )
})()
