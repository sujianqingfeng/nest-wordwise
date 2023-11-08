import { defineConfig } from '@sujian/eslint-config'

export default defineConfig({
  overrides: {
    typescript: {
      '@typescript-eslint/no-extraneous-class': 'off'
    }
  }
})
