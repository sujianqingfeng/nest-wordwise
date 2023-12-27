import type { Profile } from '@/modules/drizzle/types'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { DeepLService } from './providers/deep-l.service'

@Injectable()
export class TranslatorService {
  constructor(private httpService: HttpService) {}

  getTranslator(translator: Profile['defaultTranslation']) {
    const translators = {
      deepL: () => new DeepLService(this.httpService)
    }
    return translators[translator]()
  }

  translate(text: string, profile: Profile) {
    const translator = this.getTranslator(profile.defaultTranslation)
    return translator.translate(text, profile)
  }
}
