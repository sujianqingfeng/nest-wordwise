import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'

@Injectable()
export class ParseService {
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
}
