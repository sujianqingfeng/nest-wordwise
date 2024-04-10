import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import {
  IDictionaryForm,
  IDictionaryQueryResult
} from './providers/provider.interface'
import { stripWord } from './providers/utils'
import { YouDaoDictionaryService } from './providers/youdao.service'

import { DrizzleService } from '../drizzle/drizzle.service'
import schema from '../drizzle/export-all-schema'
import { createLogger } from '@/utils/logger'

const logger = createLogger('DictionaryService')
@Injectable()
export class DictionaryService {
  constructor(
    private drizzleService: DrizzleService,
    private youdaoDictionaryService: YouDaoDictionaryService
  ) {}

  async query(word: string): Promise<IDictionaryQueryResult> {
    // query local

    const localResult =
      await this.drizzleService.drizzle.query.dictionary.findFirst({
        where: eq(schema.dictionary.word, word),
        with: {
          forms: {
            columns: {
              formName: true,
              word: true
            }
          }
        }
      })

    if (
      localResult &&
      localResult.ukPhonetic &&
      localResult.translations.length
    ) {
      const newData = {
        ...localResult,
        forms: localResult.forms.map((form) => {
          return {
            name: form.formName,
            value: form.word
          }
        }) satisfies IDictionaryForm[]
      }
      logger.log(`local query: ${word}`)
      return newData
    }
    logger.log(`local query: [${word}] not found`)

    // query translates
    const result = await this.youdaoDictionaryService.query(word)

    this.writeDictionary(result)
    return result
  }

  async writeDictionary(result: IDictionaryQueryResult) {
    const { word } = result

    try {
      await this.drizzleService.drizzle.transaction(async (trx) => {
        const { prototype, forms, examTypes, ...rest } = result

        // exists prototype
        let prototypeRecord
        if (prototype) {
          prototypeRecord = await trx.query.dictionary.findFirst({
            where: eq(schema.dictionary.word, prototype)
          })
          if (!prototypeRecord) {
            prototypeRecord = (
              await trx
                .insert(schema.dictionary)
                .values({
                  word: prototype,
                  sw: stripWord(prototype),
                  examTypes
                })
                .returning()
            )[0]
          }
        }

        const current = (
          await trx
            .insert(schema.dictionary)
            .values({
              word,
              sw: stripWord(word),
              examTypes,
              ...rest,
              prototypeId: prototypeRecord ? prototypeRecord.id : null
            })
            .onConflictDoUpdate({
              target: schema.dictionary.word,
              set: {
                examTypes,
                ...rest
              }
            })
            .returning()
        )[0]

        if (!prototype && forms.length) {
          forms.forEach(async (form) => {
            const { name, value } = form

            await trx
              .insert(schema.dictionary)
              .values({
                word: value,
                examTypes,
                formName: name,
                sw: stripWord(value),
                prototypeId: current.id
              })
              .onConflictDoUpdate({
                target: schema.dictionary.word,
                set: {
                  formName: name
                }
              })
          })
        }
      })
    } catch (e) {
      logger.error(`writeDictionary failed: ${word}`, e.message)
    }
  }
}
