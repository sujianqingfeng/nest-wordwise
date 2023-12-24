import type {
  AuthProvidersItemResp,
  AuthReq,
  AuthTokenReq
} from './dtos/auth.dto'
import type { Response } from 'express'
import { Body, Controller, Get, Post, Res } from '@nestjs/common'
import { from } from 'rxjs'
import { map, toArray } from 'rxjs/operators'
import { AUTH_PROVIDERS } from 'src/constants'
import { AuthService } from './auth.service'
import { Public } from '@/decorator'

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('providers')
  providers() {
    const mapToProviders = (provider): AuthProvidersItemResp => {
      return {
        provider: provider,
        authUrl: this.authService.getAuthProvider(provider).getAuthUrl()
      }
    }
    return from(AUTH_PROVIDERS).pipe(map(mapToProviders), toArray())
  }

  @Post()
  async auth(
    @Body() body: AuthReq,
    @Res({ passthrough: true }) response: Response
  ) {
    const { provider, code } = body

    const authProvider = this.authService.getAuthProvider(provider)

    const user = await authProvider.getUserByCode(code)

    const info = await this.authService.getTokenUser(user)
    const cookieToken = `Bearer ${info.token}`

    response.cookie('token', cookieToken, { httpOnly: true })
    return info
  }

  @Post('token')
  async authByToken(@Body() body: AuthTokenReq) {
    const { token, provider } = body
    const authProvider = this.authService.getAuthProvider(provider)
    const user = await authProvider.getUserByToken(token)
    return this.authService.getTokenUser(user)
  }
}
