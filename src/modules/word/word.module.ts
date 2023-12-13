import { Module } from '@nestjs/common'
import { WordController } from './word.controller'
import { WordService } from './word.service'
import { DictionaryModule } from '@/modules/dictionary/dictionary.module'

@Module({
  imports: [DictionaryModule],
  controllers: [WordController],
  providers: [WordService]
})
export class WordModule {}
