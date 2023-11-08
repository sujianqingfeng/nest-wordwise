import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'
import { Signer } from '@volcengine/openapi'
import { map } from 'rxjs'
import { DictionaryProvider } from './provider.interface'

@Injectable()
export class VolcanoEngineService implements DictionaryProvider {
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

  translate(word: string, profile: Profile) {
    const query = this.sign(
      profile.volcanoAccessKeyId,
      profile.volcanoSecretKey
    )

    return this.httpService
      .post(`https://translate.volcengineapi.com?${query}`, {
        TargetLanguage: 'zh',
        TextList: [word]
      })
      .pipe(
        map((res) => res.data),
        map((data) => {
          const { TranslationList } = data
          const res = {
            result: ''
          }
          if (TranslationList.length) {
            res.result = TranslationList[0].Translation
          }
          return res
        })
      )
  }
}
