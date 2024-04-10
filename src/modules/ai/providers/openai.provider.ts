import type { AIProvider } from './provider.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

// const BASE_URL = 'https://api.chatanywhere.tech'
const BASE_URL = 'https://api.chatanywhere.cn'

@Injectable()
export class OpenAIProvider implements AIProvider {
  constructor(private httpService: HttpService) {}

  async generateContent(text: string, key: string): Promise<string> {
    const { data } = await this.httpService.axiosRef.post(
      `${BASE_URL}/v1/chat/completions`,
      {
        model: 'gpt-3.5-turbo-0125',
        messages: [
          {
            role: 'user',
            content: text
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const { choices } = data
    const { message } = choices[0] || {}
    return message.content
  }
}
