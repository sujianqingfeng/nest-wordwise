import type { Profile } from '@/modules/drizzle/types'

export interface TranslateResult {
  result: string
}
export interface TranslatorProvider {
  translate(text: string, profile: Profile): Promise<TranslateResult>
}
