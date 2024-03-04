import { Injectable } from '@nestjs/common'
import { GeminiProvider } from './providers/genimi.provider'

@Injectable()
export class AIService {
  constructor(private readonly geminiProvider: GeminiProvider) {}

  generateContent(text: string, key: string) {
    return this.geminiProvider.generateContent(text, key)
  }
}
