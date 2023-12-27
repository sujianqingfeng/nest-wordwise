import { Controller, Get, Req, Put, Body } from '@nestjs/common'
import { type Request } from 'express'
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

  async updateTranslation(@Req() req: Request) {
    const { id } = req.user
    this.profileService.updateTranslation(id)
  }
}
