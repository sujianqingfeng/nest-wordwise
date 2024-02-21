import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import {
  CreateReadLaterDto,
  QueryReadLaterListDto
} from './dtos/read-later.dto'
import { ReadLaterService } from './read-later.service'
import { CurrentUser } from '@/decorator/user.decorator'

@Controller('read-later')
export class ReadLaterController {
  constructor(private readLaterService: ReadLaterService) {}

  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() body: CreateReadLaterDto
  ) {
    return this.readLaterService.create(userId, body)
  }

  @Delete()
  async delete(@CurrentUser('id') userId: string, id: string) {
    return this.readLaterService.delete({ userId, id })
  }

  @Get('list')
  async list(
    @CurrentUser('id') userId: string,
    @Query() query: QueryReadLaterListDto
  ) {
    const { size, page } = query
    return this.readLaterService.list({
      page,
      size,
      userId
    })
  }
}
