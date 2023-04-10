import fs from 'fs'
import path from 'path'

import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

import dotenv from 'dotenv'
import destr from 'destr'

import type { Hentai } from '../src/core/@types/Hentai'
import type { DB } from './@types/DB'

dotenv.config()
const hentaiDirectory = path.join(process.cwd(), 'data/hentai')

;(async () => {
  if (process.env.DATABASE_URL === undefined) {
    return
  }

  const kysely = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        connectionString: process.env.DATABASE_URL,
      }),
    }),
  })
  try {
    // list ids in local cache
    const ids = await kysely.selectFrom('Hentai').select('id').execute()

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
                destr(
                  fs.readFileSync(path.join(hentaiDirectory, o), 'utf8')
                ) as Hentai
              ).id
            )
      )
      .map(file => {
        return destr(
          fs.readFileSync(path.join(hentaiDirectory, file), 'utf8')
        ) as Hentai
      })

    if (itemsToPush.length !== 0)
      await kysely
        .insertInto('Hentai')
        .values(
          itemsToPush.map(item => ({
            id: item.id,
            data: JSON.stringify(item),
          }))
        )
        .execute()
  } catch (e) {
    console.log(e)
  } finally {
    await kysely.destroy()
  }
})()
