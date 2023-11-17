import { Controller, Req, Post, Body } from '@nestjs/common'
import { type Request } from 'express'
import { TranslateDto } from './translator.interface'
import { TranslatorService } from './translator.service'
import { UserService } from '../user/user.service'

@Controller('translator')
export class TranslatorController {
  constructor(
    private userService: UserService,
    private translatorService: TranslatorService
  ) {}

  @Post('translate')
  async find(@Req() req: Request, @Body() body: TranslateDto) {
    const profile = await this.userService.profile(req)
    const { text } = body
    return this.translatorService.translate(text, profile)
  }
}
