import { Test, TestingModule } from '@nestjs/testing';
import { TranslatorService } from './translator.service';

describe('TranslatorService', () => {
  let service: TranslatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslatorService],
    }).compile();

    service = module.get<TranslatorService>(TranslatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
