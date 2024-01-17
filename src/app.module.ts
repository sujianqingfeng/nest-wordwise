import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE, APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { ZodValidationPipe } from 'nestjs-zod'
import { AppController } from './app.controller'

import { BusinessExceptionFilter } from './filters/business.filter'
import { AuthGuard } from './guards/auth'
import { TransformInterceptor } from './interceptors/transform.interceptor'
import { AuthModule } from './modules/auth/auth.module'
import { DrizzleModule } from './modules/drizzle/drizzle.module'
import { ProfileModule } from './modules/profile/profile.module'
import { TranslatorModule } from './modules/translator/translator.module'
import { UserModule } from './modules/user/user.module'
import { WordModule } from './modules/word/word.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.registerAsync({
      useFactory: async () => {
        const secret = process.env.JWT_SECRET
        return {
          secret,
          signOptions: { expiresIn: '30d' }
        }
      },
      global: true
    }),
    DrizzleModule.forRoot(),
    AuthModule,
    UserModule,
    WordModule,
    ProfileModule,
    TranslatorModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: BusinessExceptionFilter
    }
  ]
})
export class AppModule {}
