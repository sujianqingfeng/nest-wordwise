import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'
import { TranslatorProvider } from './provider.interface'
import { createTranslateResult } from './utils'

const FREE_API_DOMAIN = 'https://api-free.deepl.com'

@Injectable()
export class DeepLService implements TranslatorProvider {
  constructor(private httpService: HttpService) {}

  async translate(text: string, profile: Profile) {
    const authKey = profile.deepLAuthKey
    if (authKey) {
      throw new Error('deepL-auth-key is not set')
    }

    const res = await this.httpService.axiosRef.post(
      `${FREE_API_DOMAIN}/v2/translate`,
      {
        text: [text]
      },
      {
        headers: {
          Authorization: `DeepL-Auth-Key ${authKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(
      '🚀 ~ file: deep-l.service.ts:29 ~ DeepLService ~ translate ~ res:',
      res
    )
    const { translations } = res.data

    let result = ''
    if (translations.length) {
      result = translations[0].text
    }
    return createTranslateResult({ result })
  }
}