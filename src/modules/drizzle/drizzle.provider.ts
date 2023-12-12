import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

import schema from './export-all-schema'

export const DrizzleProvider = 'drizzleProvider'

export const drizzleProvider = [
  {
    provide: DrizzleProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const connectionString = configService.get<string>('DATABASE_URL')
      const client = new Client({
        connectionString
      })
      await client.connect()
      return drizzle(client, { schema, logger: true })
    }
  }
]
