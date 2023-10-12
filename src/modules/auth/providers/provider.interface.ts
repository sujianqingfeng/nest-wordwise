import { Observable } from 'rxjs'

interface Token {
  token: string
}

export interface AuthProvider  {
  getAuthUrl(): string
  getToken(code: string): Observable<Token>
}