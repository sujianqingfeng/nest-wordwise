import { Module } from '@nestjs/common'
import { ParseService } from './parse.service'

@Module({
  providers: [ParseService]
})
export class ParseModule {}
