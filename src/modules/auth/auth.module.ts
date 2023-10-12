import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET } from 'src/constants'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    HttpModule, 
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30d' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}