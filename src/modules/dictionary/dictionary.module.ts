import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { DictionaryController } from './dictionary.controller'
import { DictionaryService } from './dictionary.service'
import { YouDaoDictionaryService } from './providers/youdao.service'
import { UserModule } from '../user/user.module'
import { WordService } from '../word/word.service'

@Module({
  imports: [UserModule, HttpModule],
  controllers: [DictionaryController],
  providers: [DictionaryService, WordService, YouDaoDictionaryService],
  exports: [DictionaryService]
})
export class DictionaryModule {}
