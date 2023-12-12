import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'

@Injectable()
export class OpenAiService {
  createCompletions(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  ) {
    const openai = new OpenAI()
    return openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages
    })
  }
}
