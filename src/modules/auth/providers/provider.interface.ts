import { Observable } from 'rxjs'

export interface User {
  name: string
  email: string
  avatar: string
}

export interface AuthProvider  {
  getAuthUrl(): string
  getUser(code: string): Observable<User>
}