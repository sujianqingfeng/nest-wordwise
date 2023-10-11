import { Body, Controller, Get, Post } from '@nestjs/common'
import { from } from 'rxjs'
import { map, toArray } from 'rxjs/operators'
import { AUTH_PROVIDERS } from 'src/constants'
import { AuthService } from './auth.service'
import type { AuthProvidersItemResp, AuthReq } from 'src/api.interface'

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Get('providers')
  getAuthProviders() {
    const mapToProviders = (provider): AuthProvidersItemResp => {
      return {
        provider: provider,
        authUrl: this.authService.getAuthProvider(provider).getAuthUrl()
      }
    }
    return from(AUTH_PROVIDERS)
      .pipe(
        map(mapToProviders),
        toArray()
      )
  }

  @Post()
  async getAuth(@Body() body: AuthReq) {
    const { provider, code } = body
    await this.authService.getAuthProvider(provider).getToken(code)
    
  }
}