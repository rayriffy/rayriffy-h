import fs from 'fs'
import path from 'path'

import { Hentai } from '@riffyh/commons'

import { hentaiDirectory } from '../constants/hentaiDirectory'
import { collections } from "../constants/mongo";

export const sync = async () => {
  if (process.env.MONGODB_URL === undefined) {
    console.error(
      'no database url provided, please provide postgres connection url'
    )
    return process.exit(1)
  }

  try {
    const remoteIds = (await collections.galleries.find({}, {
      projection: { _id: 0, id: 1 },
    }).toArray()).map(o => o.id)

    // push new data to local cache
    const itemsToPush = fs
      .readdirSync(hentaiDirectory)
      .filter(o => !o.startsWith('.') && o.endsWith('.json'))
      .filter(
        o =>
          !remoteIds.includes(
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

    if (itemsToPush.length > 0)
      await collections.galleries.insertMany(itemsToPush)

    process.exit(0)
  } catch (e) {
    console.log(e)
  }
}
