import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { tap, catchError } from 'rxjs/operators'
import type { AuthProvider } from './provider.interface'

@Injectable()
export class GoogleAuthService implements AuthProvider {

  constructor(private readonly httpService: HttpService) {}

  getAuthUrl(): string {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = process.env.GOOGLE_REDIRECT_URI
    const scope = process.env.GOOGLE_SCOPE
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
  }
  async getToken(code: string) {
    console.log('🚀 ~ file: google.ts:18 ~ GoogleAuthService ~ getToken ~ code:', code)
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = process.env.GOOGLE_REDIRECT_URI
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    
    return this.httpService.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }, {
      proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 7890
      }
    })
      .pipe(
        tap(val => console.log(`BEFORE MAP: ${val}`)),
        catchError(err => {
          console.log(`CAUGHT ERROR: ${err}`)
          return err
        })
      )
  }
}