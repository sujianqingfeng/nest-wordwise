import { Module } from '@nestjs/common'
import { drizzleProvider, DrizzleProvider } from './drizzle.provider'

@Module({})
export class DrizzleModule {
  static forRoot() {
    const providers = [...drizzleProvider]

    return {
      global: true,
      module: DrizzleModule,
      providers,
      exports: [DrizzleProvider]
    }
  }
}
