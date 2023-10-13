import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'

import { AuthModule } from './modules/auth/auth.module'
import { CommonModule } from './modules/common/common.module'
import { ProfileModule } from './modules/profile/profile.module'
import { UserModule } from './modules/user/user.module'
import { WordModule } from './modules/word/word.module'
@Module({
  imports: [
    ConfigModule.forRoot(), 
    CommonModule.forRoot(),
    AuthModule,
    UserModule,
    WordModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
