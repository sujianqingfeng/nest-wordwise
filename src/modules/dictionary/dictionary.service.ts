import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { IDictionaryQueryResult } from './providers/provider.interface'
import { stripWord } from './providers/utils'
import { YouDaoDictionaryService } from './providers/youdao.service'

import { DrizzleService } from '../drizzle/drizzle.service'
import schema from '../drizzle/export-all-schema'
import {
  DictionaryFormInsert,
  DictionaryInsert,
  DictionaryTranslateInsert
} from '../drizzle/types'
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
          forms: true,
          translations: true
        }
      })

    if (localResult) {
      logger.log(`local query: ${word}`, localResult)
      return localResult
    }

    const wordForm =
      await this.drizzleService.drizzle.query.dictionaryForms.findFirst({
        where: eq(schema.dictionaryForms.word, word)
      })
    if (wordForm) {
      return this.query(wordForm.word)
    }

    // query translates
    const result = await this.youdaoDictionaryService.query(word)

    const { forms, translations, ...rest } = result
    const { ukPhonetic, ukSpeech } = rest
    //
    if (ukPhonetic && ukSpeech) {
      this.writeDictionary(
        { word, sw: stripWord(word), ...rest },
        forms,
        translations
      )
    }

    return result
  }

  async writeDictionary(
    dictionaryInsert: DictionaryInsert,
    dictionaryFormsInsert: DictionaryFormInsert[],
    dictionaryTranslatesInsert: DictionaryTranslateInsert[]
  ) {
    const { word } = dictionaryInsert

    const result = await this.drizzleService.drizzle.query.dictionary.findFirst(
      {
        where: eq(schema.dictionary.word, word)
      }
    )

    if (result) {
      logger.log(`writeDictionary: word [${word}] already exists, so skip`)
      return
    }

    try {
      this.drizzleService.drizzle.transaction(async (trx) => {
        const current = (
          await trx
            .insert(schema.dictionary)
            .values(dictionaryInsert)
            .returning()
        )[0]

        // TODO: extract map to a function
        await trx.insert(schema.dictionaryForms).values(
          dictionaryFormsInsert.map((item) => ({
            ...item,
            word,
            dictionaryId: current.id
          }))
        )

        await trx.insert(schema.dictionaryTranslates).values(
          dictionaryTranslatesInsert.map((item) => ({
            ...item,
            word,
            dictionaryId: current.id
          }))
        )
      })
    } catch (e) {
      logger.error(`writeDictionary failed: ${word}`, e.message)
    }
  }
}
