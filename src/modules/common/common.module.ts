import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({})
export class CommonModule {
  static forRoot() {
    const providers = [PrismaService]
    return {
      global: true,
      module: CommonModule,
      providers,
      exports: providers
    }
  }
}
