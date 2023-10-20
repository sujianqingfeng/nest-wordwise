import { Profile } from '@prisma/client'
import { type Observable } from 'rxjs'

interface TranslateResult {
  result: string
}
export interface DictionaryProvider {
  translate(word: string, profile: Profile): Observable<TranslateResult> 
}