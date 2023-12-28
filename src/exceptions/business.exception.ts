export class BusinessException extends Error {
  constructor(message) {
    super(message)
    this.name = 'BusinessException'
  }
}
