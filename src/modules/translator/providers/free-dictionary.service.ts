import type { DictionaryProvider } from './provider.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { tap } from 'rxjs/operators'

// https://dictionaryapi.dev/

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en'

@Injectable()
export class FreeDictionaryService implements DictionaryProvider {
  constructor(private readonly httpService: HttpService) {}

  translate(word: string): any {
    return this.httpService.get(`${url}/${word}`).pipe(
      tap((val) => {
        console.log('---val', val.data)
      })
    )
  }
}
