export type AuthProvider =  {
  getAuthUrl(): string

  getToken(): any
}