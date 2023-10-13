import { Injectable } from '@nestjs/common'
import { VolcanoEngineService } from './providers/volcano-engine.service'

@Injectable()
export class DictionaryService {

  constructor(
    private readonly volcanoEngineService: VolcanoEngineService 
  ) {}

  find(word: string): string {
    return this.volcanoEngineService.find(word)
  }
}
