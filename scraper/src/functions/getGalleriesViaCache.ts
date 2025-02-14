import { MongoClient } from "mongodb";
import type { Hentai } from "@riffyh/commons/dist";
import { writeItem } from "./writeItem";

export const getGalleriesViaCache = async (codes: number[]): Promise<number[]> => {
  console.log('setting up...')
  const mongo = new MongoClient(process.env.MONGODB_URL!)
  await mongo.connect()
  const collection = mongo.db('riffyh-data').collection<Hentai>('nh-galleries')

  const amountOfGalleries = await collection.countDocuments({
    id: { $in: codes }
  })

  console.log(`${amountOfGalleries} items found in cache! writing to file...`)

  if (amountOfGalleries === 0) return []

  const paginationSize = 300
  const writtenIds: number[] = []
  for (let i = 0; i < amountOfGalleries; i += paginationSize) {
    const items = await collection
      .find({
        id: { $in: codes }
      }, {
        projection: { _id: 0 }
      })
      .skip(i)
      .limit(paginationSize)
      .toArray()

    await Promise.all(
      items.map(item => writeItem(item.id, item))
    )
    writtenIds.push(...items.map(o => o.id))
  }

  console.log('remote cache written to file!')

  await mongo.close()

  return writtenIds
}
