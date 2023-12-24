import type { Request } from 'express'
import { Controller, Get, Post, Body, Req, Delete, Query } from '@nestjs/common'
import {
  CreateWordDto,
  QueryCollectedWordDto,
  QueryWordListDto
} from './dtos/word.dto'
import { WordService } from './word.service'

@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get('/isCollected')
  async isCollected(
    @Req() req: Request,
    @Query() query: QueryCollectedWordDto
  ) {
    const { id: userId } = req.user
    const { word } = query
    const isCollected = await this.wordService.word({ word, userId })
    return { isCollected: !!isCollected }
  }

  @Get('/list')
  getWords(@Req() req: Request, @Query() query: QueryWordListDto) {
    const { id: userId } = req.user
    const { page, size } = query
    return this.wordService.words({ page, size, userId })
  }

  @Get('/all')
  getAllWords(@Req() req: Request) {
    const { id: userId } = req.user
    return this.wordService.allWords({ userId })
  }

  @Get('/year-calendar')
  getCollectionCalendar(@Req() req: Request) {
    const { id: userId } = req.user
    return this.wordService.groupByCreatedAt(userId)
  }

  @Post()
  createWord(@Req() req: Request, @Body() body: CreateWordDto) {
    const { id: userId } = req.user
    const { word } = body
    return this.wordService.createWord({ word, userId })
  }

  @Delete()
  deleteWord(@Req() req: Request, @Body() createWordDto: CreateWordDto) {
    const { id: userId } = req.user
    const { word } = createWordDto
    return this.wordService.deleteWord({ word, userId })
  }
}
