import type { AuthProvider } from './provider.interface'

export default function createGoogleAuthProvider(): AuthProvider {
  return {
    getAuthUrl() {
      const clientId = process.env.GOOGLE_CLIENT_ID
      const redirectUri = process.env.GOOGLE_REDIRECT_URI
      const scope = process.env.GOOGLE_SCOPE
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
    },

    getToken() {
      // https://www.googleapis.com/oauth2/v4/token
      // code=4/AACbpkMFarNdMwz1qVPV0mWcnfjSt0zMcNcUogSMgr2lcZU2G7qjf7B-f1lmTkhRpfgXFBwxzd9ad3vRD1Oymgk#&client_id=187637922392-nm8r2q89o9gub1ftmuos32coutiumkt1.apps.googleusercontent.com&client_secret=aspzni4WpLp3pv_Ixszax_pQ&grant_type=authorization_code&redirect_uri=http://localhost

    }
  }
}