import { Module } from '@nestjs/common'
import { OpenAiService } from './open-ai.service'

@Module({
  providers: [OpenAiService]
})
export class OpenAiModule {}
