import type { Request } from 'express'
import { Controller, Get, Post, Body, Req, Delete, Query } from '@nestjs/common'
import { subYears } from 'date-fns'
import {
  CreateWordDto,
  QueryCollectedResultDto,
  QueryCollectedWordDto,
  QueryWordListDto
} from './word.dto'
import { WordService } from './word.service'

@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get('/isCollected')
  async isCollected(
    @Req() req: Request,
    @Query() query: QueryCollectedWordDto
  ): Promise<QueryCollectedResultDto> {
    const { id: userId } = req.user
    const { word } = query
    const isCollected = await this.wordService.find({ word, userId })
    return { isCollected: !!isCollected }
  }

  @Get('/list')
  getWords(@Req() req: Request, @Query() query: QueryWordListDto) {
    const { id } = req.user
    const { skip, take } = query
    return this.wordService.words({ skip, take, where: { userId: id } })
  }

  @Get('/all')
  getAllWords(@Req() req: Request) {
    const { id: userId } = req.user
    return this.wordService.allWords({ userId })
  }

  @Get('/year-calendar')
  getCollectionCalendar(@Req() req: Request) {
    const { id: userId } = req.user
    const now = new Date()
    return this.wordService.groupByCreatedAt({
      userId,
      createdAt: {
        gte: subYears(now, 1),
        lt: now
      }
    })
  }

  @Post()
  createWord(@Req() req: Request, @Body() body: CreateWordDto) {
    const { id: userId } = req.user
    const { word } = body
    return this.wordService.createWord({ word, userId })
  }

  @Delete()
  deleteWord(@Req() req: Request, @Body() createWordDto: CreateWordDto) {
    const { id } = req.user
    const { word } = createWordDto
    return this.wordService.deleteWord(id, word)
  }
}
