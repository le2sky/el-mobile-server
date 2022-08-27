import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../../../src/app.module';
import { TrainerEntity } from '../entities/trainer.entity';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'el',
    entities: ['**/*.entity{.ts,.js}'],
  });
  await appDataSource.initialize();
  await appDataSource.synchronize();

  const repository = appDataSource.getRepository(TrainerEntity);

  const seeds = Array.from({ length: 9 }, (v, i) => i + 1).map((v, index) => {
    return repository.create({
      id: `test${index}`,
      password: `test${index}`,
      phone_number: `010-${String(index).repeat(4)}-${String(index).repeat(4)}`,
      name: `테스트트레이너${index}`,
      award: '수상 없음',
      career: '경력 없음',
      self_introduction: `잘부탁드립니다. 테스트 트레이너 ${index}번 입니다.`,
    });
  });

  await repository.save(seeds);

  //save one
  // await repository.save(
  //   repository.create({
  //     id: `test10`,
  //     password: `test10`,
  //     phone_number: `010-0000-0000`,
  //     name: `테스트트레이너10`,
  //     award: '수상 없음',
  //     career: '경력 없음',
  //     self_introduction: `잘부탁드립니다. 테스트 트레이너 10번 입니다.`,
  //   }),
  // );

  await appDataSource.destroy();

  process.exit();
})();
