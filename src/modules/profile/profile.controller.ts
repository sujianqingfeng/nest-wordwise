import { Controller, Get, Req, Put, Body } from '@nestjs/common'
import { Profile } from '@prisma/client'
import { type Request } from 'express'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: Request) {
    const { id } = req.user
    const profile = await this.profileService.profile({ userId: id })
    if (profile) {
      return profile
    }

    return this.profileService.createProfile({ userId: id })
  }

  @Put()
  async updateProfile(@Body() body: Profile) {
    const profile = await this.profileService.updateProfile({
      where: { id: body.id },
      data: body
    })
    return profile
  }
}
