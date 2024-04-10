import { CurrentUser } from "@/decorator/user.decorator";
import { Controller, Get, Query } from "@nestjs/common";
import { ProfileService } from "@/modules/profile/profile.service";
import { AIService } from "./ai.service";
import { ANALYSIS_GAMMAR_PROMPT } from "@/constants";
import { AnalyticsGrammarDto } from "./dtos/ai.dto";

@Controller("ai")
export class AIController {
  constructor(
    private profileService: ProfileService,
    private aiService: AIService,
  ) {}

  @Get("/analysis-grammar")
  async analysisGrammar(
    @CurrentUser("id") userId: string,
    @Query() query: AnalyticsGrammarDto,
  ) {
    const profile = await this.profileService.profile(userId);

    const { text } = query;
    const prompt = `${ANALYSIS_GAMMAR_PROMPT}${text}`;

    return this.aiService.generateContent(prompt, profile);
  }
}
