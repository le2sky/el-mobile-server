import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { AppModule } from 'src/app.module';
import { TrainerEntity } from '../entities/trainer.entity';
import { ConfigService } from '@nestjs/config';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(ConfigService);

  const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: config.get('DB_ROOT_PW'),
    database: config.get('DB_DB_NAME'),
    entities: [TrainerEntity],
  });

  process.exit();
})();
