import { Injectable } from '@nestjs/common'
import { DictionaryProvider } from './provider.interface'

@Injectable()
export class VolcanoEngineService implements DictionaryProvider {

  find(word: string): string {
    return 'volcano'
  }
}