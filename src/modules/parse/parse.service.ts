import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import { OpenAiService } from '../open-ai/open-ai.service'

@Injectable()
export class ParseService {
  constructor(private openAiService: OpenAiService) {}

  removeUselessTags(buffer: Buffer) {
    const $ = cheerio.load(buffer)
    $('style').remove()
    $('script').remove()
    $('meta').remove()
    $('link').remove()
    $('svg').remove()
    $('div').each(function (this) {
      const text = $(this).text().trim()
      if (!text) {
        $(this).remove()
      }
    })
    return $.html()
  }

  parseNode(html: string) {
    return this.openAiService.createCompletions([
      {
        role: 'system',
        content: '分析html结构，提取标题、时间、正文的css选择器'
      },
      {
        role: 'user',
        content: html
      }
    ])
  }
}
