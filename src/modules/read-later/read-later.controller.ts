import { Body, Controller, Post } from '@nestjs/common'
import { CreateReadLaterDto } from './dtos/read-later.dto'
import { CurrentUser } from '@/decorator/user.decorator'

@Controller('read-later')
export class ReadLaterController {
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() body: CreateReadLaterDto
  ) {
    return 'Create read later'
  }
}
