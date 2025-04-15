import fs from 'fs'
import path from 'path'
import { MongoClient } from 'mongodb'
import type { Hentai } from '@riffyh/commons'
import { hentaiDirectory } from '../constants/hentaiDirectory'

export const sync = async () => {
  if (process.env.MONGODB_URL === undefined) {
    console.error(
      'no database url provided, please provide postgres connection url'
    )
    return process.exit(1)
  }

  console.log('setting up...')
  const mongo = new MongoClient(process.env.MONGODB_URL)
  await mongo.connect()
  const collection = mongo.db('riffyh-data').collection<Hentai>('nh-galleries')

  try {
    console.log('reading ids from remote database')
    const amountOfItemsInRemote = await collection.countDocuments()
    console.log(`${amountOfItemsInRemote} items to read...`)

    const remoteIds: number[] = (
      await collection
        .find({}, { projection: { id: 1 } })
        .toArray()
    ).map(res => res.id)
    console.log('read ' + remoteIds.length + ' items from remote database')

    // push new data to local cache
    const itemsToPush = fs
      .readdirSync(hentaiDirectory)
      .filter(o => !o.startsWith('.') && o.endsWith('.json'))
      .map(file => JSON.parse(fs.readFileSync(path.join(hentaiDirectory, file), 'utf8')) as Hentai)
      .filter(o => !remoteIds.includes(o.id))

    console.log(itemsToPush.length + ' items to push')

    if (itemsToPush.length > 0) {
      const batchSize = parseInt(process.env.BATCH_SIZE || '200', 10)
      console.log(`Using batch size of ${batchSize}`)
      
      // Split items into batches
      for (let i = 0; i < itemsToPush.length; i += batchSize) {
        const batch = itemsToPush.slice(i, i + batchSize)
        console.log(`Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(itemsToPush.length / batchSize)} (${batch.length} items)`)
        await collection.insertMany(batch)
      }
    }

    await mongo.close()
    process.exit(0)
  } catch (e) {
    console.log(e)
  }
}
