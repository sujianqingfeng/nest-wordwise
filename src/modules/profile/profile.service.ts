import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../common/prisma.service'

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  profile(profileWhereUniqueInput: Prisma.ProfileWhereUniqueInput) {
    return this.prismaService.profile.findUnique({
      where: profileWhereUniqueInput
    })
  }

  createProfile(data: Prisma.ProfileUncheckedCreateInput) {
    return this.prismaService.profile.create({ data })
  }

  updateProfile(params: {
    where: Prisma.ProfileWhereUniqueInput
    data: Partial<Prisma.ProfileUpdateInput>
  }) {
    return this.prismaService.profile.update(params)
  }
}
