import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TranslatorController } from './translator.controller'
import { TranslatorService } from './translator.service'
import { ProfileService } from '../profile/profile.service'

@Module({
  imports: [HttpModule],
  controllers: [TranslatorController],
  providers: [TranslatorService, ProfileService]
})
export class TranslatorModule {}
