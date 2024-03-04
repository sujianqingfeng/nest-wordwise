export interface AIProvider {
  generateContent(text: string, key: string): Promise<string>
}
