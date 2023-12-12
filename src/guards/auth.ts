import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { JWT_SECRET } from '@/constants'
import { IS_PUBLIC_KEY } from '@/decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET
      })
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    if (type === 'Bearer') {
      return token
    }

    const cookie = request.headers.cookie as string
    if (cookie && cookie.includes('token=')) {
      const current = cookie
        .split(';')
        .find((str) => str.includes('token=Bearer'))

      const [type, token] = decodeURIComponent(current).split('=')[1].split(' ')
      if (type === 'Bearer') {
        return token
      }
    }
  }
}
