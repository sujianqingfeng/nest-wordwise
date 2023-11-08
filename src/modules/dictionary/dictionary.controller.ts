import { Controller, Get, Param } from '@nestjs/common'
import { DictQueryResultDto } from './dictionary.dto'
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
    const dictionary = await this.dictionaryService.word({ word })
    const isCollectedWord = await this.wordService.find({ word })
    const result: DictQueryResultDto = {
      ...dictionary,
      isCollected: !!isCollectedWord
    }
    return result
  }

  @Get('match/:word')
  async match(@Param('word') word: string) {
    return this.dictionaryService.words({
      where: {
        sw: {
          contains: word
        }
      }
    })
  }
}
