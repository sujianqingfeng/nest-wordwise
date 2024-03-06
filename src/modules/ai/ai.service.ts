import { Injectable } from '@nestjs/common'
import { GeminiProvider } from './providers/genimi.provider'
import type { Profile } from '@/modules/drizzle/types'

@Injectable()
export class AIService {
  constructor(private readonly geminiProvider: GeminiProvider) {}

  async generateContent(prompt: string, profile: Profile) {
    const { geminiKey } = profile
    const result = await this.geminiProvider.generateContent(prompt, geminiKey)

    return {
      result
    }
  }
}
