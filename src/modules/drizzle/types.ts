import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import schema from './export-all-schema'

export type DrizzleDB = NodePgDatabase<typeof schema>

export type UserInsert = typeof schema.users.$inferInsert

export type DictionaryInsert = typeof schema.dictionary.$inferInsert
// export type DictionaryFormInsert = typeof schema.dictionaryForms.$inferInsert
// export type DictionaryTranslateInsert =
// typeof schema.dictionaryTranslates.$inferInsert

export type ProfileInsert = typeof schema.profiles.$inferInsert
export type Profile = typeof schema.profiles.$inferSelect

export type WordInsert = typeof schema.words.$inferInsert
export type Word = typeof schema.words.$inferSelect
