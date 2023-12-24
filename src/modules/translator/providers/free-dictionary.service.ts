import type { TranslatorProvider } from './provider.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

// https://dictionaryapi.dev/

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en'

@Injectable()
export class FreeDictionaryService implements TranslatorProvider {
  constructor(private readonly httpService: HttpService) {}

  translate(word: string): any {
    return this.httpService.get(`${url}/${word}`)
  }
}
