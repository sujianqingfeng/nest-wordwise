export interface IDictionaryForm {
  name: string
  value: string
}

export interface IDictionaryTranslation {
  translation: string
  partName: string
}

export interface IDictionaryQueryResult {
  word: string
  ukPhonetic: string
  usPhonetic: string
  ukSpeech: string
  usSpeech: string
  prototype?: string

  forms: IDictionaryForm[]
  translations: IDictionaryTranslation[]

  examTypes: string[]
}

export interface IDictionaryProvider {
  query(word: string): Promise<IDictionaryQueryResult>
}
