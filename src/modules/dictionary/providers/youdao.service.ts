import type {
  IDictionaryProvider,
  IDictionaryQueryResult
} from './provider.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { createYDSign } from './utils'

const DICT_URL = 'https://dict.youdao.com/jsonapi_s?doctype=json&jsonversion=4'
const USER_AGENT =
  'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36'

const KEY_FROM = 'webdict'

@Injectable()
export class YouDaoDictionaryService implements IDictionaryProvider {
  constructor(private httpService: HttpService) {}

  getSpeechUrl(speech?: string) {
    return speech ? `https://dict.youdao.com/dictvoice?audio=${speech}` : ''
  }

  async query(word: string): Promise<IDictionaryQueryResult> {
    const r = createYDSign(''.concat(word).concat(KEY_FROM))
    const time = ''.concat(word).concat(KEY_FROM).length % 10
    const data = {
      q: word,
      le: 'en',
      client: 'web',
      keyfrom: KEY_FROM,
      t: time,
      sign: createYDSign(
        ''
          .concat('web')
          .concat(word)
          .concat(`${time}`)
          .concat('Mk6hqtUp33DGGtoS63tTJbMUYjRrG1Lu')
          .concat(r)
      )
    }

    const res = await this.httpService.axiosRef.post(DICT_URL, data, {
      headers: {
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })

    if (res.status !== 200) {
      throw new Error('YouDaoDictionaryService.query failed')
    }

    const { ec } = res.data
    const {
      word: {
        usphone: usPhonetic = '',
        ukphone: ukPhonetic = '',
        ukspeech: ukSpeech = '',
        usspeech: usSpeech = '',
        trs = [],
        wfs = []
      }
    } = ec

    return {
      word,
      ukPhonetic,
      ukSpeech: this.getSpeechUrl(ukSpeech),
      usPhonetic,
      usSpeech: this.getSpeechUrl(usSpeech),
      translations: trs.map((item: any) => {
        return {
          translate: item.tran,
          position: item.pos
        }
      }),
      forms: wfs.map((item: any) => {
        return {
          name: item.wf.name,
          value: item.wf.value
        }
      })
    }
  }
}
