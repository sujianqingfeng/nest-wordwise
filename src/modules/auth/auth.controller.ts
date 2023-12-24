import type { Response } from 'express'
import { Body, Controller, Get, Post, Res } from '@nestjs/common'
import { AUTH_PROVIDERS } from 'src/constants'
import { AuthService } from './auth.service'
import { CodeAuthDto, TokenAuthDto } from './dtos/auth.dto'
import { Public } from '@/decorator'

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('providers')
  providers() {
    const mapToProviders = (provider) => {
      return {
        provider: provider,
        authUrl: this.authService.getAuthProvider(provider).getAuthUrl()
      }
    }
    return AUTH_PROVIDERS.map(mapToProviders)
  }

  @Post()
  async auth(
    @Body() body: CodeAuthDto,
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
  async authByToken(@Body() body: TokenAuthDto) {
    const { token, provider } = body
    const authProvider = this.authService.getAuthProvider(provider)
    const user = await authProvider.getUserByToken(token)
    return this.authService.getTokenUser(user)
  }
}
