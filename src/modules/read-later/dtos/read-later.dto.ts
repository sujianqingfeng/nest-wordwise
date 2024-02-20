import { createInsertSchema } from 'drizzle-zod'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import schema from '@/modules/drizzle/export-all-schema'

const ReadLaterInsertSchema = createInsertSchema(schema.readLater, {
  publishedTime: z.coerce.date()
}).omit({
  userId: true,
  id: true,
  createAt: true
})

export class CreateReadLaterDto extends createZodDto(ReadLaterInsertSchema) {}
