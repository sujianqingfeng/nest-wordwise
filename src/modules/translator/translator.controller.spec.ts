import { Test, TestingModule } from '@nestjs/testing';
import { TranslatorController } from './translator.controller';

describe('TranslatorController', () => {
  let controller: TranslatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslatorController],
    }).compile();

    controller = module.get<TranslatorController>(TranslatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
