import type { AIProvider } from './provider.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { getProxy } from '@/utils'

@Injectable()
export class GeminiProvider implements AIProvider {
  constructor(private httpService: HttpService) {}

  async generateContent(text: string, key: string) {
    try {
      const { data } = await this.httpService.axiosRef.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`,
        {
          contents: [
            {
              parts: [
                {
                  text: text
                }
              ]
            }
          ]
        },
        {
          proxy: getProxy()
        }
      )
      const { candidates } = data
      const { content } = candidates[0] || {}
      const { parts } = content
      const { text: partText } = parts[0] || {}
      return partText
    } catch (error) {
      console.log('err', error)
    }
  }
}
