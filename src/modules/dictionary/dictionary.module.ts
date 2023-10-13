import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { DictionaryController } from './dictionary.controller'
import { DictionaryService } from './dictionary.service'
import { VolcanoEngineService } from './providers/volcano-engine.service'

@Module({
  imports: [HttpModule],
  controllers: [DictionaryController],
  providers: [DictionaryService, VolcanoEngineService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
