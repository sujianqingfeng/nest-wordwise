import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { IDictionaryQueryResult } from './providers/provider.interface'
import { stripWord } from './providers/utils'
import { YouDaoDictionaryService } from './providers/youdao.service'
import { DrizzleProvider } from '../drizzle/drizzle.provider'

import schema from '../drizzle/export-all-schema'
import {
  DictionaryFormInsert,
  DictionaryInsert,
  DictionaryTranslateInsert,
  DrizzleDB
} from '../drizzle/types'
import { createLogger } from '@/utils/logger'

const logger = createLogger('DictionaryService')
@Injectable()
export class DictionaryService {
  constructor(
    @Inject(DrizzleProvider) private drizzleDB: DrizzleDB,
    private youdaoDictionaryService: YouDaoDictionaryService
  ) {}

  async query(word: string): Promise<IDictionaryQueryResult> {
    // query local

    const localResult = await this.drizzleDB.query.dictionary.findFirst({
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

    const wordForm = await this.drizzleDB.query.dictionaryForms.findFirst({
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

    const result = await this.drizzleDB.query.dictionary.findFirst({
      where: eq(schema.dictionary.word, word)
    })

    if (result) {
      logger.log(`writeDictionary: word [${word}] already exists, so skip`)
      return
    }

    try {
      this.drizzleDB.transaction(async (trx) => {
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
            id: current.id
          }))
        )

        await trx.insert(schema.dictionaryTranslates).values(
          dictionaryTranslatesInsert.map((item) => ({
            ...item,
            word,
            id: current.id
          }))
        )
      })
    } catch (e) {
      logger.error(`writeDictionary failed: ${word}`, e.message)
    }
  }
}
