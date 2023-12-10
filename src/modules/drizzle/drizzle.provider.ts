import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { Client } from 'pg'
import schema from './export-all-schema'

export const DrizzleProvider = 'drizzleProvider'

export const drizzleProvider = [
  {
    provide: DrizzleProvider,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const connectionString = configService.get<string>('DATABASE_URL')
      const client = new Client({
        connectionString
      })
      return drizzle(client, { schema, logger: true })
    }
  }
]
