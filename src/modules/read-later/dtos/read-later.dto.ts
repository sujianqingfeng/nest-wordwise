import { createInsertSchema } from 'drizzle-zod'
import { createZodDto } from 'nestjs-zod'
import schema from '@/modules/drizzle/export-all-schema'

const ReadLaterInsertSchema = createInsertSchema(schema.readLater)

export class CreateReadLaterDto extends createZodDto(ReadLaterInsertSchema) {}
