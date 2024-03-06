import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AIService } from './ai.service'
import { GeminiProvider } from './providers/genimi.provider'
import type { Profile } from '@/modules/drizzle/types'

describe('AIService', () => {
  let service: AIService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AIService, GeminiProvider]
    }).compile()

    service = module.get<AIService>(AIService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('connected', async () => {
    const profile = {
      defaultAIEngine:'gemini',
      geminiKey:''
    } as Profile

    const { result } = await service.generateContent('hello', profile)
    expect(result).toMatchInlineSnapshot(
      `"Hello there. How can I help you today?"`
    )
  })
})
