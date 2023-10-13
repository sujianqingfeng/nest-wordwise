import { Controller, Get, Post, Body, Param } from '@nestjs/common'

@Controller('word')
export class WordController {

  @Get()
  getWords() {
    return ['word1', 'word2']
  }

  @Post()
  createWord(@Body() word: string) {
    return word
  }
}
