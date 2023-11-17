import { Profile } from '@prisma/client'

export interface TranslateResult {
  result: string
}
export interface TranslatorProvider {
  translate(text: string, profile: Profile): Promise<TranslateResult>
}
