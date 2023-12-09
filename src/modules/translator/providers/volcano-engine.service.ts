import type { Profile } from '@/modules/drizzle/types'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Signer } from '@volcengine/openapi'
import { TranslatorProvider } from './provider.interface'
import { createTranslateResult } from './utils'

@Injectable()
export class VolcanoEngineService implements TranslatorProvider {
  constructor(private httpService: HttpService) {}

  sign(accessKeyId: string, secretKey: string) {
    const s = new Signer(
      {
        method: 'POST',
        region: 'cn-north-1',
        params: {
          Action: 'TranslateText',
          Version: '2020-06-01'
        }
      },
      'translate'
    )

    return s.getSignUrl({
      accessKeyId,
      secretKey
    })
  }

  async translate(word: string, profile: Profile) {
    const query = this.sign(
      profile.volcanoAccessKeyId,
      profile.volcanoSecretKey
    )

    const res = await this.httpService.axiosRef.post(
      `https://translate.volcengineapi.com?${query}`,
      {
        TargetLanguage: 'zh',
        TextList: [word]
      }
    )

    const { TranslationList } = res.data
    let result = ''
    if (TranslationList.length) {
      result = TranslationList[0].Translation
    }
    return createTranslateResult({ result })
  }
}
