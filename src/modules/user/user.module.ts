import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { ProfileService } from '../profile/profile.service'

@Module({
  controllers: [UserController],
  providers: [UserService, ProfileService],
  exports: [UserService]
})
export class UserModule {}
