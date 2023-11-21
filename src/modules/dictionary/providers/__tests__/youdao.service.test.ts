import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { YouDaoDictionaryService } from '../youdao.service'

describe('YouDaoDictionaryService', () => {
  let service: YouDaoDictionaryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YouDaoDictionaryService],
      imports: [HttpModule]
    }).compile()

    service = module.get<YouDaoDictionaryService>(YouDaoDictionaryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should query', async () => {
    const result = await service.query('hello')
    expect(result).toMatchSnapshot()
  })
})
