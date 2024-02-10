import { createDBConnection } from "../functions/createDBConnection"

export const seed = async () => {
  if (process.env.DATABASE_URL === undefined) {
    console.error('no database url provided, please provide postgres connection url')
    process.exit(1)
  } else {
    const db = createDBConnection()

    await db.schema
      .createTable('Hentai')
      .addColumn('id', 'int4', o => o.primaryKey())
      .addColumn('data', 'jsonb', o => o.notNull())
      .execute()

    await db.destroy()
  }
}