export interface IDictionaryQueryResult {
  word: string
  ukPhonetic: string
  usPhonetic: string
  ukSpeech: string
  usSpeech: string

  forms: {
    name: string
    value: string
  }[]

  translates: {
    translate: string
    position: string
  }[]
}

export interface IDictionaryProvider {
  query(word: string): Promise<IDictionaryQueryResult>
}