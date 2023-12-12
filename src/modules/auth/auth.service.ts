import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { GoogleAuthService } from './providers/google'
import { User } from './providers/provider.interface'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  getAuthProvider(provider: string) {
    switch (provider) {
      case 'google':
        return new GoogleAuthService(this.httpService)
    }
  }

  async getTokenUser(user: User) {
    const { email, name } = user
    const { id } = (await this.userService.upsert(user))[0]

    const token = this.jwtService.sign({ email, name, id })
    return { token, id, ...user }
  }
}
