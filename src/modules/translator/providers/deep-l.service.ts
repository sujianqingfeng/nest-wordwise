import type { Profile } from '@/modules/drizzle/types'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { TranslatorProvider } from './provider.interface'
import { createTranslateResult } from './utils'

const FREE_API_DOMAIN = 'https://api-free.deepl.com'

@Injectable()
export class DeepLService implements TranslatorProvider {
  constructor(public httpService: HttpService) {}

  async translate(text: string, profile: Profile) {
    const authKey = profile.deepLAuthKey
    if (!authKey) {
      throw new Error('deepL-auth-key is not set')
    }

    try {
      const res = await this.httpService.axiosRef.post(
        `${FREE_API_DOMAIN}/v2/translate`,
        {
          text: [text],
          target_lang: 'ZH'
        },
        {
          headers: {
            Authorization: `DeepL-Auth-Key ${authKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const { translations } = res.data

      let result = ''
      if (translations.length) {
        result = translations[0].text
      }
      return createTranslateResult({ result })
    } catch (error) {
      throw new Error('deepL-auth-key may not be set correctly')
    }
  }
}
