export interface User {
  name: string
  email: string
  avatar: string
}

export interface AuthProvider  {
  getAuthUrl(): string
  getUserByCode(code: string): Promise<User>
  getUserByToken(token: string): Promise<User>
}