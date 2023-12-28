import { Controller, Req, Post, Body } from '@nestjs/common'
import { type Request } from 'express'
import { TranslateTextDto } from './dtos/translator.dto'
import { TranslatorService } from './translator.service'
import { ProfileService } from '../profile/profile.service'

@Controller('translator')
export class TranslatorController {
  constructor(
    private profileService: ProfileService,
    private translatorService: TranslatorService
  ) {}

  @Post('translate')
  async find(@Req() req: Request, @Body() body: TranslateTextDto) {
    const { id } = req.user
    const profile = await this.profileService.profile(id)
    const { text } = body
    return this.translatorService.translate(text, profile)
  }
}
