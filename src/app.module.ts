import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AppController } from './app.controller'

import { JWT_SECRET } from './constants'
import { AuthGuard } from './guards/auth'
import { AuthModule } from './modules/auth/auth.module'
import { CommonModule } from './modules/common/common.module'
import { ProfileModule } from './modules/profile/profile.module'
import { TranslatorModule } from './modules/translator/translator.module'
import { UserModule } from './modules/user/user.module'
import { WordModule } from './modules/word/word.module'
@Module({
  imports: [
    ConfigModule.forRoot(),
    CommonModule.forRoot(),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30d' },
      global: true
    }),
    AuthModule,
    UserModule,
    WordModule,
    ProfileModule,
    TranslatorModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
