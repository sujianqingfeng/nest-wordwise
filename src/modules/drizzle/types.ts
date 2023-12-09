import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import schema from './export-all-schema'

export type DrizzleDB = PostgresJsDatabase<typeof schema>

export type UserInsert = typeof schema.users.$inferInsert

export type DictionaryInsert = typeof schema.dictionary.$inferInsert
export type DictionaryFormInsert = typeof schema.dictionaryForms.$inferInsert
export type DictionaryTranslateInsert =
  typeof schema.dictionaryTranslates.$inferInsert
