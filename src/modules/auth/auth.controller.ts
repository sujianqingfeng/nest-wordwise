import type {
  AuthProvidersItemResp,
  AuthReq,
  AuthTokenReq
} from './auth.interface'
import { Body, Controller, Get, Post } from '@nestjs/common'
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
  async auth(@Body() body: AuthReq) {
    const { provider, code } = body
    const authProvider = this.authService.getAuthProvider(provider)
    const user = await authProvider.getUserByCode(code)
    return this.authService.getTokenUser(user)
  }

  @Post('token')
  async authByToken(@Body() body: AuthTokenReq) {
    const { token, provider } = body
    const authProvider = this.authService.getAuthProvider(provider)
    const user = await authProvider.getUserByToken(token)
    return this.authService.getTokenUser(user)
  }
}
