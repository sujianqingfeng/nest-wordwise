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



const AIEngineEnum = ['gemini', 'openAI'] as const

const UpdateAIEngineSchema = z
  .object({
    defaultAIEngine: z.enum(AIEngineEnum),
    openAIKey: z.string().optional(),
    geminiKey: z.string().optional()
  })
  .refine(
    (data) => {
      return !!data.defaultAIEngine
    },
    {
      message: 'defaultAIEngine is required',
      path: ['defaultAIEngine']
    }
  )
  .refine(
    (data) => {
      if (data.defaultAIEngine === 'openAI') {
        return !!data.openAIKey
      }
      return true
    },
    {
      message: 'openAIKey is required',
      path: ['openAIKey']
    }
  )
  .refine(
    (data) => {
      if (data.defaultAIEngine === 'gemini') {
        return !!data.geminiKey
      }
      return true
    },
    {
      message: 'geminiKey is required',
      path: ['geminiKey']
    }
  )


export class UpdateAIEngineDto extends createZodDto(
  UpdateAIEngineSchema
) {}
