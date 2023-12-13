import type { Profile } from '@/modules/drizzle/types'
import { Injectable } from '@nestjs/common'
import { DeepLService } from './providers/deep-l.service'

@Injectable()
export class TranslatorService {
  constructor(private deepLService: DeepLService) {}

  translate(text: string, profile: Profile) {
    return this.deepLService.translate(text, profile)
  }
}
