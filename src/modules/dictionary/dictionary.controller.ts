import { Controller, Get, Query } from '@nestjs/common'
import { DictQueryDto, DictQueryResultDto } from './dictionary.dto'
import { DictionaryService } from './dictionary.service'

@Controller('dictionary')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @Get('query')
  async query(@Query() query: DictQueryDto) {
    const { word } = query
    const dictionary = await this.dictionaryService.query(word)

    const result: DictQueryResultDto = {
      ...dictionary
    }
    return result
  }
}
