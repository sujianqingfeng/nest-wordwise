const { defineConfig } = require('@sujian/eslint-config')

module.exports = defineConfig({
  overrides: {
    typescript: {
      '@typescript-eslint/no-extraneous-class': 'off'
    }
  }
})
