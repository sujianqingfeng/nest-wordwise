import { Module } from '@nestjs/common'
import { DictionaryController } from './dictionary.controller'
import { DictionaryService } from './dictionary.service'
import { UserModule } from '../user/user.module'
import { WordService } from '../word/word.service'

@Module({
  imports: [UserModule],
  controllers: [DictionaryController],
  providers: [DictionaryService, WordService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
