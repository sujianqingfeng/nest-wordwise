import { CanActivate, Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context) {
    const request = context.switchToHttp().getRequest()
    console.log('🚀 ~ file: auth.ts:7 ~ AuthGuard ~ canActivate ~ request:', request)
    const { user } = request
    console.log('🚀 ~ file: auth.ts:8 ~ AuthGuard ~ canActivate ~ user:', user)
    return true
  }
}