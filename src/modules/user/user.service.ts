import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { type Request } from  'express'
import { PrismaService } from 'src/modules/common/prisma.service'
import { ProfileService } from '../profile/profile.service'

@Injectable()
export class UserService {

  constructor(
    private prismaService: PrismaService,
    private profileService: ProfileService
  ) {}

  profile(req: Request) {
    return this.profileService.profile({ userId: req.user.id })
  }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: userWhereUniqueInput })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput,
    data: Partial<Prisma.UserUpdateInput>
  }): Promise<User> {
    const { where, data } = params
    return this.prismaService.user.update({
      data,
      where,
    }) 
  }

}
