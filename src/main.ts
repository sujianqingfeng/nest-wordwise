import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AuthGuard } from './guards/auth'
import { TransformInterceptor } from './interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalGuards(new AuthGuard())

  await app.listen(3456)
}

bootstrap()
