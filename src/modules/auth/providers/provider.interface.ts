export interface AuthProvider  {
  getAuthUrl(): string
  getToken(code: string): any
}