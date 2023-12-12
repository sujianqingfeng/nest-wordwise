import { Controller, Get, Req } from '@nestjs/common'
import { type Request } from 'express'

@Controller('user')
export class UserController {
  @Get()
  info(@Req() req: Request) {
    return req.user
  }
}
