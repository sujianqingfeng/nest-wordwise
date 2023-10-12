import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'

import { AuthModule } from './modules/auth/auth.module'
import { CommonModule } from './modules/common/common.module'
import { UserModule } from './modules/user/user.module'
@Module({
  imports: [
    ConfigModule.forRoot(), 
    CommonModule.forRoot(),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
