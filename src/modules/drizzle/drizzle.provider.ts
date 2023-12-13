import { ConfigService } from '@nestjs/config'
import { DefaultLogger, LogWriter } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

import schema from './export-all-schema'
import { type DrizzleDB } from './types'
import { createLogger } from '@/utils/logger'
import { createPageHelper } from '@/utils/page'

export const DrizzleProvider = 'drizzleProvider'
export const DrizzleHelperProvider = 'drizzleHelperProvider'

const logger = createLogger('drizzle')

class NestLogWriter implements LogWriter {
  write(message: string) {
    logger.log(message)
  }
}

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
      return drizzle(client, {
        schema,
        logger: new DefaultLogger({
          writer: new NestLogWriter()
        })
      })
    }
  },
  {
    provide: DrizzleHelperProvider,
    inject: [DrizzleProvider],
    useFactory: (drizzleDB: DrizzleDB) => {
      return createPageHelper(drizzleDB)
    }
  }
]

export { schema }
export type PageHelper = ReturnType<typeof createPageHelper>
