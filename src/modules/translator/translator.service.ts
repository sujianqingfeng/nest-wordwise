import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'
import { VolcanoEngineService } from './providers/volcano-engine.service'

@Injectable()
export class TranslatorService {
  constructor(private volcanoEngineService: VolcanoEngineService) {}

  translate(text: string, profile: Profile) {
    return this.volcanoEngineService.translate(text, profile)
  }
}
