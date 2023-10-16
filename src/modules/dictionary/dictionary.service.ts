import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'
import { VolcanoEngineService } from './providers/volcano-engine.service'

@Injectable()
export class DictionaryService {

  constructor(
    private volcanoEngineService: VolcanoEngineService,
  ) {}

  async find( word: string, profile: Profile) {
    return this.volcanoEngineService.translate(word, profile)
  }
}
