import { relations } from 'drizzle-orm'
import {
  pgTable,
  varchar,
  text,
  timestamp,
  primaryKey,
  json,
  pgEnum,
  uuid
} from 'drizzle-orm/pg-core'

const defaultId = uuid('id').defaultRandom().notNull().primaryKey()
const createAt = timestamp('create_at', { mode: 'date' }).notNull().defaultNow()

export const users = pgTable('users', {
  id: defaultId,
  email: varchar('email', { length: 50 }).unique(),
  name: varchar('name', { length: 12 }),
  avatar: varchar('avatar', { length: 255 }),
  password: varchar('password', { length: 50 }),

  createAt
})

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId]
  }),
  words: many(usersToWords),
  readLaterList: many(readLater)
}))

// profiles

export const defaultTranslationEnum = pgEnum('default_translation', [
  'deepL',
  'volcano',
  'openAI'
])

export const defaultAIEngineEnum = pgEnum('default_ai_engine', [
  'openAI',
  'gemini'
])

export const profiles = pgTable('profiles', {
  id: defaultId,
  volcanoAccessKeyId: varchar('volcano_access_key_id', { length: 50 }),
  volcanoSecretKey: varchar('volcano_secret_key', { length: 50 }),
  deepLAuthKey: varchar('deep_l_auth_key', { length: 50 }),
  openAIKey: varchar('open_ai_key', { length: 50 }),
  geminiKey: varchar('gemini_key', { length: 50 }),

  defaultTranslation: defaultTranslationEnum('deepL'),
  defaultAIEngine: defaultAIEngineEnum('gemini'),

  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),

  createAt
})

// words

export const words = pgTable('words', {
  id: defaultId,
  word: varchar('word', { length: 20 }).unique(),
  simpleTranslation: varchar('simple_translate', { length: 100 }),

  userId: uuid('user_id').references(() => users.id),

  createAt
})

export const wordsRelations = relations(words, ({ many }) => ({
  users: many(usersToWords)
}))

export const usersToWords = pgTable(
  'users_to_words',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    wordId: uuid('word_id')
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
  id: defaultId,
  word: varchar('word', { length: 20 }).unique(),
  sw: varchar('sw', { length: 20 }),
  ukPhonetic: varchar('uk_phonetic', { length: 30 }),
  usPhonetic: varchar('us_phonetic', { length: 30 }),
  ukSpeech: varchar('uk_speech', { length: 100 }),
  usSpeech: varchar('us_speech', { length: 100 }),

  examTypes: json('exam_types').$type<string[]>().default([]),
  translations:
    json('translations').$type<{ partName: string; translation: string }[]>(),

  prototypeId: uuid('prototype_id'),
  formName: varchar('form_name', { length: 10 }),

  createAt
})

export const dictionaryRelations = relations(dictionary, ({ many, one }) => ({
  forms: many(dictionary, { relationName: 'prototype' }),
  prototype: one(dictionary, {
    fields: [dictionary.prototypeId],
    references: [dictionary.id],
    relationName: 'prototype'
  })
}))

// later
export const readLater = pgTable('read_later', {
  id: defaultId,
  source: varchar('url', { length: 100 }),
  title: varchar('title', { length: 100 }),
  desc: varchar('desc', { length: 200 }),
  author: varchar('author', { length: 20 }),
  publishedTime: timestamp('published_time', { mode: 'date' }).defaultNow(),
  content: text('content'),

  userId: uuid('user_id').references(() => users.id),

  createAt
})

export const readLaterRelations = relations(readLater, ({ one }) => ({
  user: one(users, {
    fields: [readLater.userId],
    references: [users.id]
  })
}))
