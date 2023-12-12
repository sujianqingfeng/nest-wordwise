import { Logger } from '@nestjs/common'

export function createLogger(name = '') {
  return new Logger(name)
}
