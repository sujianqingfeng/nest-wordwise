import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { createProxyMiddleware } from 'http-proxy-middleware'

@Module({})
export class ProxyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const ydApiProxy = createProxyMiddleware({
      target: 'https://dict.youdao.com',
      changeOrigin: true,
      pathRewrite: {
        '^/yd': ''
      }
    })

    consumer.apply(ydApiProxy).forRoutes({
      path: '/yd/*',
      method: RequestMethod.ALL
    })
  }
}
