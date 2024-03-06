import { Module } from "@nestjs/common";
import { AIService } from "./ai.service";
import { AIController } from "./ai.controller";

@Module({
  providers: [AIService],
  exports: [AIService],
  controllers: [AIController],
})
export class AiModule {}
