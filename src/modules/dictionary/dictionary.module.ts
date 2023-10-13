import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { DictionaryController } from './dictionary.controller'
import { DictionaryService } from './dictionary.service'
import { FreeDictionaryService } from './providers/free-dictionary.service'

@Module({
  imports: [HttpModule],
  controllers: [DictionaryController],
  providers: [DictionaryService, FreeDictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
