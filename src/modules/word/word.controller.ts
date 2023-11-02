import { Controller, Get, Post, Body, Req, Delete, Query } from '@nestjs/common'
import { CreateWordDto, QueryWordListDto } from './word.dto'
import { WordService } from './word.service'
import type { Request } from 'express'

@Controller('word')
export class WordController {

  constructor(
    private wordService: WordService
  ) {}

  @Get('/list')
  getWords(@Req() req: Request, @Query() query: QueryWordListDto) {
    const { id } = req.user
    const { skip, take } = query
    return this.wordService.words({ skip, take, where: { userId: id } })
  }

  @Post()
  createWord(@Req() req: Request, @Body() createWordDto: CreateWordDto) {
    const { id } = req.user
    const { word } = createWordDto
    return this.wordService.createWord({ word, userId: id })
  }
  
  @Delete()
  deleteWord(@Req() req: Request, @Body() createWordDto: CreateWordDto) {
    const { id } = req.user
    const { word } = createWordDto
    return this.wordService.deleteWord(id, word)
  }
}
