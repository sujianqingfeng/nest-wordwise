import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { GoogleAuthService } from './providers/google'

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  getAuthProvider(provider: string) {
    switch (provider) {
      case 'google':
        return new GoogleAuthService(this.httpService)
    }
  }
}