import { Controller, Get, Req, Put, Body } from '@nestjs/common'
import { type Request } from 'express'
import { UpdateAIEngineDto, UpdateTranslationDto } from './dtos/profile.dto'
import { ProfileService } from './profile.service'
import { ProfileInsert } from '../drizzle/types'

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: Request) {
    const { id } = req.user
    const profile = await this.profileService.profile(id)
    if (profile) {
      return profile
    }

    return this.profileService.createProfile({ userId: id })
  }

  @Put()
  async updateProfile(@Req() req: Request, @Body() body: ProfileInsert) {
    const { id } = req.user
    const profile = await this.profileService.updateProfile(id, body)
    return profile
  }

  @Put('translation')
  async updateTranslation(
    @Req() req: Request,
    @Body() body: UpdateTranslationDto
  ) {
    const { id } = req.user
    return this.profileService.updateTranslation(id, body)
  }


  @Put('ai-engine')
  async updateAIEngine(
    @Req() req: Request,
    @Body() body: UpdateAIEngineDto
  ) {
    const { id } = req.user
    return this.profileService.updateAIEngine(id, body)
  }
}
