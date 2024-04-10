import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { type Request } from 'express'
import { ChangePwdDto } from './dtos/user.dto'
import { UserService } from './user.service'
import { CurrentUser } from '@/decorator/user.decorator'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  info(@Req() req: Request) {
    return req.user
  }

  @Post('change-pwd')
  async changePwd(
    @CurrentUser('id') userId: string,
    @Body() body: ChangePwdDto
  ) {
    await this.userService.changePwd(userId, body)
  }
}
