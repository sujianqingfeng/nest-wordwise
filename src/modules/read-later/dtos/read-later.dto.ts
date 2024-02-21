import { createInsertSchema } from 'drizzle-zod'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import schema from '@/modules/drizzle/export-all-schema'
import { PagerDto } from '@/shared/dtos/pager.dto'

const ReadLaterInsertSchema = createInsertSchema(schema.readLater, {
  publishedTime: z.coerce.date()
}).omit({
  userId: true,
  id: true,
  createAt: true
})

export class CreateReadLaterDto extends createZodDto(ReadLaterInsertSchema) {}

export class QueryReadLaterListDto extends PagerDto {}
