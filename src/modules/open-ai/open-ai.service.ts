import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'

const openai = new OpenAI()

@Injectable()
export class OpenAiService {
  async chat() {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: ''
        }
      ]
    })
  }
}
