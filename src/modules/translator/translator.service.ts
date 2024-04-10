import type { TranslatorProvider } from './providers/provider.interface'
import type { Profile } from '@/modules/drizzle/types'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { DeepLService } from './providers/deep-l.service'
import { OpenAITranslatorService } from './providers/open-ai.service'
import { VolcanoEngineService } from './providers/volcano-engine.service'

@Injectable()
export class TranslatorService {
  constructor(public httpService: HttpService) {}

  getTranslator(translator: Profile['defaultTranslation']) {
    const translators: Record<
      Profile['defaultTranslation'],
      () => TranslatorProvider
    > = {
      deepL: () => new DeepLService(this.httpService),
      volcano: () => new VolcanoEngineService(this.httpService),
      openAI: () => new OpenAITranslatorService(this.httpService)
    }
    return translators[translator]()
  }

  translate(text: string, profile: Profile) {
    const translator = this.getTranslator(profile.defaultTranslation)
    return translator.translate(text, profile)
  }
}
