import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'

import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }), 
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
