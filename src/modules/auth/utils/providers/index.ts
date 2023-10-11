import createGoogleAuthProvider from './google'

export function createAuthProvider(provider: string) {
  switch (provider) {
    case 'google':
      return createGoogleAuthProvider()
  }
}