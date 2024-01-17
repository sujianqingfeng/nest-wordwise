import type { AuthProvider } from './provider.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { createLogger } from '@/utils/logger'

function getProxy() {
  const isDev = process.env.NODE_ENV === 'development'
  return isDev
    ? {
        protocol: 'http',
        host: '127.0.0.1',
        port: 7890
      }
    : null
}

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

const logger = createLogger('google-auth')

@Injectable()
export class GoogleAuthService implements AuthProvider {
  constructor(private readonly httpService: HttpService) {}

  getAuthUrl(): string {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = process.env.GOOGLE_REDIRECT_URI
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
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

  async getUserByToken(token: string) {
    const { data } = await this.httpService.axiosRef.get(GOOGLE_USER_INFO_URL, {
      params: { access_token: token },
      proxy: getProxy()
    })
    const { name, email, picture: avatar } = data
    return { name, email, avatar }
  }

  async getUserByCode(code: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = process.env.GOOGLE_REDIRECT_URI
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    try {
      const { data } = await this.httpService.axiosRef.post(
        GOOGLE_ACCESS_TOKEN_OBTAIN_URL,
        {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code'
        },
        { proxy: getProxy() }
      )

      const { access_token } = data
      return this.getUserByToken(access_token)
    } catch (error) {
      logger.error(error)
      throw new UnauthorizedException()
    }
  }
}
