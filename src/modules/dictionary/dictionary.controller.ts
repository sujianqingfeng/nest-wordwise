import { Controller, Get, Query } from '@nestjs/common'
import { DictionaryService } from './dictionary.service'
import { DictQueryDto } from './dtos/dictionary.dto'

@Controller('dictionary')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @Get('query')
  async query(@Query() query: DictQueryDto) {
    const { word } = query
    const dictionary = await this.dictionaryService.query(word)

    return dictionary
  }
}
