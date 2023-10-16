import { Controller, Get, Param, Req, } from '@nestjs/common'
import { type Request } from 'express'
import { DictionaryService } from './dictionary.service'
import { UserService } from '@/modules/user/user.service'

@Controller('dictionary')
export class DictionaryController {

  constructor(
    private dictionaryService: DictionaryService,
    private userService: UserService,
  ) {}

  @Get('find/:word')
  async find(@Req() req: Request, @Param('word') word: string) {
    const profile = await this.userService.profile(req)

    return this.dictionaryService.find(word, profile)
  }
}
