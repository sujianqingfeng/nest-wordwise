import { Module } from '@nestjs/common'
import { ReadLaterController } from './read-later.controller'
import { ReadLaterService } from './read-later.service'

@Module({
  controllers: [ReadLaterController],
  providers: [ReadLaterService]
})
export class ReadLaterModule {}
