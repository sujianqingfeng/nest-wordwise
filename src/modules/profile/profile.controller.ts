import { Controller, Get, Req } from '@nestjs/common'
import { type Request } from 'express'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {

  constructor(
    private profileService: ProfileService
  ) {}

  @Get()
  async getProfile(@Req() req: Request) {
    const { id } = req.user
    const profile = await this.profileService.profile({ userId: id })
    if (profile) {
      return profile
    }

    return this.profileService.createProfile({ userId: id })
  }
}
