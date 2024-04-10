import type { Profile } from '@/modules/drizzle/types'
import { Injectable } from '@nestjs/common'
import { GeminiProvider } from './providers/genimi.provider'
import { OpenAIProvider } from './providers/openai.provider'

@Injectable()
export class AIService {
  constructor(
    private geminiProvider: GeminiProvider,
    private openAIProvider: OpenAIProvider
  ) {}

  async generateContent(prompt: string, profile: Profile) {
    const { defaultAIEngine, geminiKey, openAIKey } = profile

    let result = null

    switch (defaultAIEngine) {
      case 'gemini':
        result = await this.geminiProvider.generateContent(prompt, geminiKey)
        break
      case 'openAI':
        result = await this.openAIProvider.generateContent(prompt, openAIKey)
        break

      default:
        throw new Error('Unsupported AI engine')
    }

    return {
      result
    }
  }
}
