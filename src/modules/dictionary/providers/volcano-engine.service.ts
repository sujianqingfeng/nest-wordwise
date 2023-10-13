import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Signer } from '@volcengine/openapi'
import { DictionaryProvider } from './provider.interface'

@Injectable()
export class VolcanoEngineService implements DictionaryProvider {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  signer() {
    const s = new Signer({
      method: 'POST',
      region: 'cn-north-1',
      params: {
        Action: 'TranslateText',
        Version: '2020-06-01'
      }
    }, 'translate')

    const url = s.getSignUrl({
      accessKeyId: '',
      secretKey: ''
    })
    console.log('🚀 ~ file: volcano-engine.service.ts:27 ~ VolcanoEngineService ~ signer ~ url:', url)
  }

  find(word: string): string {
    return 'volcano'
  }
}