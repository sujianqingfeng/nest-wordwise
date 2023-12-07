import { Module } from '@nestjs/common'
import { ParseService } from './parse.service'
import { OpenAiModule } from '../open-ai/open-ai.module'

@Module({
  providers: [ParseService],
  imports: [OpenAiModule]
})
export class ParseModule {}
