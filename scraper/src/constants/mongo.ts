import { MongoClient } from 'mongodb'

import type { Hentai } from "@riffyh/commons";

const globalMongo = global as unknown as {
  mongo?: MongoClient
}

export const mongo = globalMongo.mongo || new MongoClient(Bun.env.MONGODB_URL!)

globalMongo.mongo = mongo

// We can call `.db` and `.collection` as much as we like.
// Until we actually make a query, it won’t connect to the database.

const db = mongo.db('riffyh-data')

export const collections = {
  galleries: db.collection<Hentai>('nh-galleries'),
}
