import type { Profile } from '@/modules/drizzle/types'
import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AIService } from './ai.service'
import { GeminiProvider } from './providers/genimi.provider'
import { OpenAIProvider } from './providers/openai.provider'

describe('AIService', () => {
  let service: AIService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AIService, GeminiProvider, OpenAIProvider]
    }).compile()

    service = module.get<AIService>(AIService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it.skip('gemini-connected', async () => {
    const profile = {
      defaultAIEngine: 'gemini',
      geminiKey: ''
    } as Profile

    const { result } = await service.generateContent('hello', profile)
    expect(result).toMatchInlineSnapshot(
      `"Hello there. How can I help you today?"`
    )
  })

  it('open-ai', async () => {
    const profile = {
      defaultAIEngine: 'openAI',
      openAIKey: ''
    } as Profile

    const { result } = await service.generateContent('hello', profile)
    expect(result).toMatchSnapshot()
  })
})
