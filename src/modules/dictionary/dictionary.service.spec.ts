import { Test, TestingModule } from '@nestjs/testing'
import { DictionaryService } from './dictionary.service'

describe('DictionaryService', () => {
  let service: DictionaryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictionaryService]
    }).compile()

    service = module.get<DictionaryService>(DictionaryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
