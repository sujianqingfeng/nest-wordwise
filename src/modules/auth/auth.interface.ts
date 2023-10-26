import type { User } from './providers/provider.interface'

export type AuthProvidersItemResp = {
  provider: string
  authUrl: string
}

export type AuthReq =  {
  code: string
  provider: string
}

export type AuthTokenReq =  {
  token: string
  provider: string
}

export type TokenUser = {
  token: string
} & User