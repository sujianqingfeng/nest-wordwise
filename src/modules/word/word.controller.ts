import { Controller, Get, Post, Body, Req } from '@nestjs/common'
import { CreateWordDto } from './word.dto'
import { WordService } from './word.service'
import type { Request } from 'express'

@Controller('word')
export class WordController {

  constructor(
    private wordService: WordService
  ) {}

  @Get()
  getWords() {
    return ['word1', 'word2']
  }

  @Post()
  createWord(@Req() req: Request, @Body() createWordDto: CreateWordDto) {
    const { id } = req.user
    const { word } = createWordDto
    return this.wordService.createWord({ word, userId: id })
  }
}
