import fs from 'fs'
import path from 'path'

import { Hentai } from '@riffyh/commons'

import { hentaiDirectory } from '../constants/hentaiDirectory'
import { createDBConnection } from '../functions/createDBConnection'
import { jsonb } from '../functions/jsonb'

export const sync = async () => {
  if (process.env.DATABASE_URL === undefined) {
    console.error(
      'no database url provided, please provide postgres connection url'
    )
    process.exit(1)
  } else {
    const db = createDBConnection()

    try {
      // list ids in local cache
      const ids = await db
        .selectFrom('Hentai')
        .select('id')
        .execute()
        .then(o => o.map(p => p.id))

      // push new data to local cache
      const itemsToPush = fs
        .readdirSync(hentaiDirectory)
        .filter(o => !o.startsWith('.') && o.endsWith('.json'))
        .filter(
          o =>
            !ids.includes(
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

      console.log(itemsToPush.length + ' items to push')

      await db.insertInto('Hentai').values(
        itemsToPush.map(item => ({
          id: item.id,
          data: jsonb(JSON.stringify(item)),
        }))
      )
    } catch (e) {
      console.log(e)
    } finally {
      await db.destroy()
    }
  }
}
