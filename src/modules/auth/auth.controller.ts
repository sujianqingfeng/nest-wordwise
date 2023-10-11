import { Body, Controller, Get, Post } from '@nestjs/common'
import { from } from 'rxjs'
import { map, toArray } from 'rxjs/operators'
import { AUTH_PROVIDERS } from 'src/constants'
import { createAuthProvider } from './utils/providers'
import type { AuthProvidersItemResp, AuthReq } from 'src/api.interface'

@Controller('auth')
export class AuthController {

  @Get('providers')
  getAuthProviders() {
    const mapToProviders = (provider): AuthProvidersItemResp => {
      return {
        provider: provider,
        authUrl: createAuthProvider(provider).getAuthUrl()
      }
    }
    return from(AUTH_PROVIDERS)
      .pipe(
        map(mapToProviders),
        toArray()
      )
  }

  @Post()
  getAuth(@Body() body: AuthReq) {
    
    return { auth: 'works' }
  }
}