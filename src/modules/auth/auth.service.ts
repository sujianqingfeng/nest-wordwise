import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MD5 } from 'crypto-js'
import { GoogleAuthService } from './providers/google'
import { User } from './providers/provider.interface'
import { UserService } from '../user/user.service'
import { BusinessException } from '@/exceptions/business.exception'

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
    const { email, name, avatar } = user
    const { id } = (await this.userService.upsert(user))[0]

    const token = this.jwtService.sign({ email, name, id })
    return { token, id, email, name, avatar }
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.user({ email })

    if (!user) {
      throw new BusinessException('User not found')
    }

    if (!user.password) {
      throw new BusinessException('Password not set')
    }

    if (user.password !== MD5(password).toString()) {
      throw new BusinessException('Password incorrect')
    }
    return this.getTokenUser(user)
  }
}
