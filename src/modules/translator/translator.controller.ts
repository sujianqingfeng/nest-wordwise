import { Controller, Req, Post, Body } from '@nestjs/common'
import { type Request } from 'express'
import { TranslateDto } from './translator.dto'
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
    const { id } = req.user
    const profile = await this.userService.profile(id)
    const { text } = body
    return this.translatorService.translate(text, profile)
  }
}
