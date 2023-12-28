import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const TranslationEnum = ['deepL', 'volcano'] as const

const UpdateTranslationSchema = z
  .object({
    defaultTranslation: z.enum(TranslationEnum),
    deepLAuthKey: z.string().optional(),
    volcanoAccessKeyId: z.string().optional(),
    volcanoSecretKey: z.string().optional()
  })
  .refine(
    (data) => {
      return !!data.defaultTranslation
    },
    {
      message: 'defaultTranslation is required',
      path: ['defaultTranslation']
    }
  )
  .refine(
    (data) => {
      if (data.defaultTranslation === 'deepL') {
        return !!data.deepLAuthKey
      }
      return true
    },
    {
      message: 'deepLAuthKey is required',
      path: ['deepLAuthKey']
    }
  )
  .refine(
    (data) => {
      if (data.defaultTranslation === 'volcano') {
        return !!data.volcanoAccessKeyId
      }
      return true
    },
    {
      message: 'volcanoAccessKeyId is required',
      path: ['volcanoAccessKeyId']
    }
  )
  .refine(
    (data) => {
      if (data.defaultTranslation === 'volcano') {
        return !!data.volcanoSecretKey
      }
      return true
    },
    {
      message: 'volcanoSecretKey is required',
      path: ['volcanoSecretKey']
    }
  )

export class UpdateTranslationDto extends createZodDto(
  UpdateTranslationSchema
) {}
