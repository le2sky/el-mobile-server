import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { AppModule } from 'src/app.module';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  process.exit();
})();
