import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'
import { TranslatorService } from '../translator/translator.service'

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, TranslatorService],
  imports: [HttpModule]
})
export class ProfileModule {}
