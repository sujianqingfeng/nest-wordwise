import { relations } from 'drizzle-orm'
import {
  pgTable,
  serial,
  varchar,
  date,
  primaryKey,
  integer,
  json,
  pgEnum
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 50 }).unique(),
  name: varchar('name', { length: 12 }),
  avatar: varchar('avatar', { length: 255 }),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId]
  }),
  words: many(usersToWords)
}))

// profiles

export const defaultTranslationEnum = pgEnum('default_translation', [
  'deepL',
  'volcano',
  'openAI'
])

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  volcanoAccessKeyId: varchar('volcano_access_key_id', { length: 50 }),
  volcanoSecretKey: varchar('volcano_secret_key', { length: 50 }),
  deepLAuthKey: varchar('deep_l_auth_key', { length: 50 }),
  openAIKey: varchar('open_ai_key', { length: 50 }),

  defaultTranslation: defaultTranslationEnum('deepL'),

  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

// words

export const words = pgTable('words', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 20 }).unique(),
  simpleTranslation: varchar('simple_translate', { length: 100 }),

  userId: serial('user_id').references(() => users.id),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

export const wordsRelations = relations(words, ({ many }) => ({
  users: many(usersToWords)
}))

export const usersToWords = pgTable(
  'users_to_words',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    wordId: integer('word_id')
      .notNull()
      .references(() => words.id)
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

  translations:
    json('translations').$type<{ partName: string; translation: string }[]>(),

  prototypeId: integer('prototype_id'),
  formName: varchar('form_name', { length: 10 }),

  createAt: date('create_at', { mode: 'date' }).defaultNow()
})

export const dictionaryRelations = relations(dictionary, ({ many, one }) => ({
  forms: many(dictionary, { relationName: 'prototype' }),
  prototype: one(dictionary, {
    fields: [dictionary.prototypeId],
    references: [dictionary.id],
    relationName: 'prototype'
  })
}))
