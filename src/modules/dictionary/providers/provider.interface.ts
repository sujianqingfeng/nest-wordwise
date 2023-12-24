export interface IDictionaryForm {
  name: string
  value: string
}

export interface IDictionaryTranslation {
  translation: string
  position: string
}

export interface IDictionaryQueryResult {
  word: string
  ukPhonetic: string
  usPhonetic: string
  ukSpeech: string
  usSpeech: string

  forms: IDictionaryForm[]
  translations: IDictionaryTranslation[]
}

export interface IDictionaryProvider {
  query(word: string): Promise<IDictionaryQueryResult>
}
