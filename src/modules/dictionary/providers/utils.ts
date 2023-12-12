import { createHash } from 'node:crypto'

export const stripWord = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}

export function createYDSign(text: string) {
  return createHash('md5').update(text).digest('hex')
}
