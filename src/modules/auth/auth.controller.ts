import { Body, Controller, Get, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { from, lastValueFrom } from 'rxjs'
import { map, toArray } from 'rxjs/operators'
import { AUTH_PROVIDERS } from 'src/constants'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import type { AuthProvidersItemResp, AuthReq } from './auth.interface'
import { Public } from '@/decorator'

@Public()
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

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
    const googleUser = await lastValueFrom(this.authService.getAuthProvider(provider).getUser(code))
    const { email, name, avatar } = googleUser
    const where = { email }

    let user = await this.userService.user(where)
    if (user) {
      this.userService.updateUser({ where, data: { name, avatar } })
    } else {
      user = await this.userService.createUser(googleUser)
    }

    const token = this.jwtService.sign({ email, name, id: user.id })
    return { token, ...googleUser }
  }
}