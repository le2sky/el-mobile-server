import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressBasicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { AppModule } from './app.module';

class Application {
  private PORT: string;
  private MODE: string;
  private SWAGGER_USER: string;
  private SWAGGER_PASSWORD: string;
  private corsOriginList: string[];

  constructor(private server: NestExpressApplication) {
    this.PORT = process.env.PORT || '3000';
    this.MODE = process.env.NODE_ENV || 'local';
    this.corsOriginList = process.env.CORS_ORIGIN_LIST
      ? process.env.CORS_ORIGIN_LIST.split(',').map((origin) => origin.trim())
      : ['*'];
    this.SWAGGER_USER = process.env.SWAGGER_USER || 'admin';
    this.SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD || '1234';
  }

  private setUpGlobalPrefix() {
    this.server.setGlobalPrefix('/api');
  }

  private setUpOpenApiAuth() {
    this.server.use(
      ['/docs', 'docs-json'],
      expressBasicAuth({
        challenge: true,
        users: {
          [this.SWAGGER_USER]: this.SWAGGER_PASSWORD,
        },
      }),
    );
  }
  private setUpOpenAPImidleware() {
    SwaggerModule.setup(
      'docs',
      this.server,
      SwaggerModule.createDocument(
        this.server,
        new DocumentBuilder()
          .setTitle('el backend openAPI')
          .setDescription('EL 서버 API 문서')
          .setVersion('1.0')
          .addTag('el-backend')
          .addBearerAuth()
          .build(),
      ),
    );
  }
  private async setUpGlobalMiddleware() {
    this.server.enableCors({
      origin: this.corsOriginList,
      credentials: true,
    });
    this.setUpGlobalPrefix();
    this.setUpOpenApiAuth();
    this.setUpOpenAPImidleware();
    this.server.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    this.server.useGlobalFilters(new HttpExceptionFilter());
  }

  async bootstrap() {
    await this.setUpGlobalMiddleware();
    await this.server.listen(this.PORT);
  }
  startLog() {
    Logger.log(
      `✅ ${this.MODE} 모드로 서버-사이드 어플리케이션이 실행됩니다. `,
    );
    if (this.MODE === 'development') {
      Logger.log(`✅ Server on http://localhost:${this.PORT}`);
    } else {
      Logger.log(`✅ Server on port ${this.PORT}...`);
    }
  }

  errorLog(error: string) {
    Logger.error(`🆘 Server error ${error}`, 'Bootstrap');
  }
}

async function init() {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);
  try {
    await app.bootstrap();
  } catch (err) {
    app.errorLog(err);
  }
  app.startLog();
}

init().catch((error) => {
  Logger.error(`🆘 예기치 못한 서버 에러 : ${error}`, 'Init');
});
