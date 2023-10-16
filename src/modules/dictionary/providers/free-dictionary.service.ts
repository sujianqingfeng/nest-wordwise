import { HttpService } from '@nestjs/axios'
import { Injectable, Req } from '@nestjs/common'
import { type Request } from 'express'
import { tap } from 'rxjs/operators'
import type { DictionaryProvider } from './provider.interface'

// https://dictionaryapi.dev/

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en'

@Injectable()
export class FreeDictionaryService implements DictionaryProvider {

  constructor(
    private readonly httpService: HttpService
  ) {}

  find(@Req() req: Request, word: string): any {
    return this.httpService.get(`${url}/${word}`)
      .pipe(
        tap(val => {
          console.log('---val', val.data)
        })
      )
  }
}