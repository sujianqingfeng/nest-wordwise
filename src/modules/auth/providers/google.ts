import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { tap, map, switchMap, } from 'rxjs/operators'
import type { AuthProvider } from './provider.interface'

const proxy =  {
  protocol: 'http',
  host: '127.0.0.1',
  port: 7890
}

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

@Injectable()
export class GoogleAuthService implements AuthProvider {

  constructor(
    private readonly httpService: HttpService,
    private jwtService: JwtService
  ) {}

  getAuthUrl(): string {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = process.env.GOOGLE_REDIRECT_URI
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ')

    const params = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope
    }

    const urlParams = new URLSearchParams(params).toString()
    return `${GOOGLE_AUTH_URL}?${urlParams}`
  }

  getToken(code: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = process.env.GOOGLE_REDIRECT_URI
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    
    return this.httpService.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }, { proxy })
      .pipe(
        map(val => val.data.access_token),
        switchMap((access_token) => this.httpService.get(GOOGLE_USER_INFO_URL, { params: { access_token }, proxy })),
        map(val => val.data),
        tap((data) => {
          // TODO: to db
          const { name, picture, email } = data
          console.log('🚀 ~ file: google.ts:63 ~ GoogleAuthService ~ tap ~ email:', email)
        }),
        map(data => {
          const { name, email } = data
          return this.jwtService.sign({ name, email })
        }),
        map(token => ({ token })),
      ) 
     
  }
}