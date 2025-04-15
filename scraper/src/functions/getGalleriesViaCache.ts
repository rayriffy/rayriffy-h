import { MongoClient } from "mongodb";
import type { Hentai } from "@riffyh/commons/dist";
import { writeItem } from "./writeItem";

export const getGalleriesViaCache = async (codes: number[]): Promise<number[]> => {
  console.log('setting up...')
  const mongo = new MongoClient(process.env.MONGODB_URL!)
  await mongo.connect()
  const collection = mongo.db('riffyh-data').collection<Hentai>('nh-galleries')

  // Chunk the codes array into smaller pieces to avoid MongoDB issues
  const chunkSize = 400
  const chunkedCodes: number[][] = []
  for (let i = 0; i < codes.length; i += chunkSize) {
    chunkedCodes.push(codes.slice(i, i + chunkSize))
  }

  console.log(`Processing ${chunkedCodes.length} chunks of codes (max ${chunkSize} per chunk)`)
  
  const writtenIds: number[] = []

  // Process each chunk separately
  for (const codeChunk of chunkedCodes) {
    const amountOfGalleries = await collection.countDocuments({
      id: { $in: codeChunk }
    })

    console.log(`${amountOfGalleries} items found in cache for current chunk! writing to file...`)

    if (amountOfGalleries === 0) continue

    const items = await collection
      .find({
        id: { $in: codeChunk }
      }, {
        projection: { _id: 0 },
        enableUtf8Validation: false,
      })
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
