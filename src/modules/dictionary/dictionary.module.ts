import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { DictionaryController } from './dictionary.controller'
import { DictionaryService } from './dictionary.service'
import { YouDaoDictionaryService } from './providers/youdao.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule, HttpModule],
  controllers: [DictionaryController],
  providers: [DictionaryService, YouDaoDictionaryService],
  exports: [DictionaryService]
})
export class DictionaryModule {}
