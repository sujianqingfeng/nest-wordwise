import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { VolcanoEngineService } from './providers/volcano-engine.service'
import { TranslatorController } from './translator.controller'
import { TranslatorService } from './translator.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [HttpModule, UserModule],
  controllers: [TranslatorController],
  providers: [TranslatorService, VolcanoEngineService]
})
export class TranslatorModule {}
