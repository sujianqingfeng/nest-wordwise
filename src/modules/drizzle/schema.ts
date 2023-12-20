import { relations } from 'drizzle-orm'
import {
  pgTable,
  serial,
  varchar,
  date,
  primaryKey,
  integer
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 50 }).unique(),
  name: varchar('name', { length: 12 }),
  avatar: varchar('avatar', { length: 255 }),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  usersToWords: many(usersToWords)
}))

// profiles

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  volcanoAccessKeyId: varchar('volcano_access_key_id', { length: 50 }),
  volcanoSecretKey: varchar('volcano_secret_key', { length: 50 }),
  deepLAuthKey: varchar('deep_l_auth_key', { length: 50 }),
  openAIKey: varchar('open_ai_key', { length: 50 }),

  userId: serial('user_id')
    .notNull()
    .references(() => users.id),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

// words

export const words = pgTable('words', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 20 }).unique(),
  simpleTranslate: varchar('simple_translate', { length: 100 }),

  userId: serial('user_id').references(() => users.id),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

export const wordsRelations = relations(words, ({ many }) => ({
  usersToWords: many(usersToWords)
}))

export const usersToWords = pgTable(
  'users_to_words',
  {
    userId: serial('user_id').references(() => users.id),
    wordId: serial('word_id').references(() => words.id)
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.wordId]
    })
  })
)

export const usersToWordsRelations = relations(usersToWords, ({ one }) => ({
  user: one(users, {
    fields: [usersToWords.userId],
    references: [users.id]
  }),
  word: one(words, {
    fields: [usersToWords.wordId],
    references: [words.id]
  })
}))

// dictionary

export const dictionary = pgTable('dictionary', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 20 }).unique(),
  sw: varchar('sw', { length: 20 }),
  ukPhonetic: varchar('uk_phonetic', { length: 20 }),
  usPhonetic: varchar('us_phonetic', { length: 20 }),
  ukSpeech: varchar('uk_speech', { length: 100 }),
  usSpeech: varchar('us_speech', { length: 100 }),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

export const dictionaryRelations = relations(dictionary, ({ many }) => ({
  forms: many(dictionaryForms),
  translations: many(dictionaryTranslates)
}))

export const dictionaryForms = pgTable('dictionary_forms', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 20 }),
  name: varchar('name', { length: 10 }),
  value: varchar('value', { length: 20 }),
  dictionaryId: integer('dictionary_id'),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

export const dictionaryFormsRelations = relations(
  dictionaryForms,
  ({ one }) => ({
    dictionary: one(dictionary, {
      fields: [dictionaryForms.dictionaryId],
      references: [dictionary.id]
    })
  })
)

export const dictionaryTranslates = pgTable('dictionary_translates', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 20 }),
  translate: varchar('translate', { length: 100 }),
  position: varchar('position', { length: 10 }),
  dictionaryId: integer('dictionary_id'),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

export const dictionaryTranslatesRelations = relations(
  dictionaryTranslates,
  ({ one }) => ({
    dictionary: one(dictionary, {
      fields: [dictionaryTranslates.dictionaryId],
      references: [dictionary.id]
    })
  })
)
