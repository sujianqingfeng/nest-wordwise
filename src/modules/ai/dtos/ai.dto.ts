import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const AnalyticsGrammarSchema = z.object({
  text: z.string(),
});

export class AnalyticsGrammarDto extends createZodDto(AnalyticsGrammarSchema) {}
