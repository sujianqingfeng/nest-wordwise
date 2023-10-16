import { type Request } from 'express'

export interface DictionaryProvider {
  find(req: Request, word: string): Promise<string> 
}