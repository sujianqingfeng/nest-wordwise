import { Body, Controller, Delete, Post } from '@nestjs/common'
import { CreateReadLaterDto } from './dtos/read-later.dto'
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
}
