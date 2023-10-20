import { Controller, Get, Param } from '@nestjs/common'
import { DictionaryService } from './dictionary.service'

@Controller('dictionary')
export class DictionaryController {

  constructor(
    private dictionaryService: DictionaryService,
  ) {}

  @Get('query/:word')
  async query(@Param('word') word: string) {
    return this.dictionaryService.word({ word })
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
