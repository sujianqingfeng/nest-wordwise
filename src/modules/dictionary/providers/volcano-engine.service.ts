import { HttpService } from '@nestjs/axios'
import { Injectable, Req } from '@nestjs/common'
import { Signer } from '@volcengine/openapi'
import { type Request } from 'express'
import { DictionaryProvider } from './provider.interface'
import { UserService } from '@/modules/user/user.service'

@Injectable()
export class VolcanoEngineService implements DictionaryProvider {

  constructor(
    private httpService: HttpService,
    private userService: UserService 
  ) {}

  signer() {
    const s = new Signer({
      method: 'POST',
      region: 'cn-north-1',
      params: {
        Action: 'TranslateText',
        Version: '2020-06-01'
      }
    }, 'translate')

    const url = s.getSignUrl({
      accessKeyId: '',
      secretKey: ''
    })
    console.log('🚀 ~ file: volcano-engine.service.ts:27 ~ VolcanoEngineService ~ signer ~ url:', url)
  }

  async find(@Req() req: Request, word: string) {
    const profile = await this.userService.profile(req)
    console.log('🚀 ~ file: volcano-engine.service.ts:35 ~ VolcanoEngineService ~ find ~ profile:', profile)

    return 'volcano'
  }
}