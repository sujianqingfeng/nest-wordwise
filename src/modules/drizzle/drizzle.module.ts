import { Module } from '@nestjs/common'
import { DrizzleService } from './drizzle.service'

@Module({
  providers: [DrizzleService]
})
export class DrizzleModule {
  static forRoot() {
    const providers = [DrizzleService]

    return {
      global: true,
      module: DrizzleModule,
      providers,
      exports: providers
    }
  }
}
