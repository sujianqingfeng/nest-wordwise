import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const ProviderSchema = z.object({
  provider: z.string()
})

const CodeAuthSchema = z
  .object({
    code: z.string(),
    redirectUrl: z.string().optional()
  })
  .merge(ProviderSchema)

export class CodeAuthDto extends createZodDto(CodeAuthSchema) {}

const TokenAuthSchema = z
  .object({
    token: z.string()
  })
  .merge(ProviderSchema)

export class TokenAuthDto extends createZodDto(TokenAuthSchema) {}

const EmailCodeSchema = z.object({
  email: z.string()
})
export class GetEmailCodeDto extends createZodDto(EmailCodeSchema) {}

const SignInSchema = z.object({
  email: z.string(),
  password: z.string()
})
export class SignInDto extends createZodDto(SignInSchema) {}
