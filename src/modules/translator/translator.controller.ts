import { Controller, Param, Req, Get } from '@nestjs/common'
import { type Request } from 'express'
import { TranslatorService } from './translator.service'
import { UserService } from '../user/user.service'

@Controller('translator')
export class TranslatorController {

  constructor(
    private userService: UserService,
    private translatorService: TranslatorService
  ) {}

  @Get('translate/:word')
  async find(@Req() req: Request, @Param('text') text: string) {
    const profile = await this.userService.profile(req)
    return this.translatorService.translate(text, profile)
  }
}
