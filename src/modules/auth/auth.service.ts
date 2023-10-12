import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { GoogleAuthService } from './providers/google'

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  getAuthProvider(provider: string) {
    switch (provider) {
      case 'google':
        return new GoogleAuthService(this.httpService, this.jwtService)
    }
  }
}