import { RawBuilder, sql } from 'kysely'

export const jsonb = <T>(value: T): RawBuilder<T> => {
  return sql`CAST(${JSON.stringify(value)} AS JSONB)`
}
