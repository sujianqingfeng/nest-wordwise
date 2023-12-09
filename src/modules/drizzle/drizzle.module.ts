import { Module } from '@nestjs/common'
import { drizzleProvider, DrizzleProvider } from './drizzle.provider'

@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleProvider]
})
export class DrizzleModule {}
