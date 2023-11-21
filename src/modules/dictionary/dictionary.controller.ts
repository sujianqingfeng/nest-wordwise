import { Controller, Get, Param } from '@nestjs/common'
import { DictQueryResultWithUserDataDto } from './dictionary.dto'
import { DictionaryService } from './dictionary.service'
import { WordService } from '../word/word.service'

@Controller('dictionary')
export class DictionaryController {
  constructor(
    private dictionaryService: DictionaryService,
    private wordService: WordService
  ) {}

  @Get('query/:word')
  async query(@Param('word') word: string) {
    const dictionary = await this.dictionaryService.query(word)
    const isCollectedWord = await this.wordService.find({ word })

    const result: DictQueryResultWithUserDataDto = {
      ...dictionary,
      isCollected: !!isCollectedWord
    }
    return result
  }
}
