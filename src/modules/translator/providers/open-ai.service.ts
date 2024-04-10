import type { TranslatorProvider } from './provider.interface'
import type { Profile } from '@/modules/drizzle/types'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { createTranslateResult } from './utils'
import { OpenAIProvider } from '@/modules/ai/providers/openai.provider'

@Injectable()
export class OpenAITranslatorService implements TranslatorProvider {
  constructor(private httpService: HttpService) {}

  async translate(text: string, profile: Profile) {
    const openAIKey = profile.openAIKey
    if (!openAIKey) {
      throw new Error('openAIKey is not set')
    }

    try {
      const openAIProvider = new OpenAIProvider(this.httpService)
      const result = await openAIProvider.generateContent(
        `翻译成中文：${text}`,
        openAIKey
      )

      return createTranslateResult({ result })
    } catch (error) {
      throw new Error('openAIKey may not be set correctly')
    }
  }
}
