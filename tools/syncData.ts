import fs from 'fs'
import path from 'path'

import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

import type { Hentai } from '../src/core/@types/Hentai'

dotenv.config()
const hentaiDirectory = path.join(process.cwd(), 'data/hentai')

;(async () => {
  if (process.env.DATABASE_URL === undefined) {
    return
  }

  const prisma = new PrismaClient()
  try {
    // list ids in local cache
    const ids = await prisma.hentai.findMany({
      select: {
        id: true,
      },
    })
    // push new data to local cache
    const itemsToPush = fs
      .readdirSync(hentaiDirectory)
      .filter(o => !o.startsWith('.') && o.endsWith('.json'))
      .filter(
        o =>
          !ids
            .map(p => p.id)
            .includes(
              (
                JSON.parse(
                  fs.readFileSync(path.join(hentaiDirectory, o), 'utf8')
                ) as Hentai
              ).id
            )
      )
      .map(file => {
        return JSON.parse(
          fs.readFileSync(path.join(hentaiDirectory, file), 'utf8')
        ) as Hentai
      })
    await prisma.hentai.createMany({
      data: itemsToPush.map(item => ({
        id: item.id,
        data: JSON.stringify(item),
      })),
    })
  } catch (e) {
    console.log(e)
    await prisma.$disconnect()
  }
})()