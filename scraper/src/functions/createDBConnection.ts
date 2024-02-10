import { Pool } from 'pg'
import { Kysely, PostgresDialect } from "kysely";
import { SQLDatabase } from "../@types/SQLDatabase";

export const createDBConnection = () => new Kysely<SQLDatabase>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: Bun.env.DATABASE_URL
    }),
  }),
})
