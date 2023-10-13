import { Test, TestingModule } from '@nestjs/testing'
import { WordController } from './word.controller'

describe('WordController', () => {
  let controller: WordController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordController],
    }).compile()

    controller = module.get<WordController>(WordController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
