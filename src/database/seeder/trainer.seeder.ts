import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DataSource, Repository } from 'typeorm';
import { AppModule } from '../../../src/app.module';
import { MediaEntity } from '../entities/media.entity';
import { TrainerEntity } from '../entities/trainer.entity';

async function saveMedia(
  repository: Repository<MediaEntity>,
): Promise<MediaEntity> {
  return await repository.save(
    repository.create({
      path: 'trainer_profile/trainer.jpg',
      media_type: 'image',
    }),
  );
}

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

  const trainerRepository = appDataSource.getRepository(TrainerEntity);
  const mediaRepository = appDataSource.getRepository(MediaEntity);

  const seeds = [];

  for (let i = 1; i < 10; i++) {
    const media = await saveMedia(mediaRepository);
    const trainer = trainerRepository.create({
      id: `test${i}`,
      password: `test${i}`,
      phone_number: `010-${String(i).repeat(4)}-${String(i).repeat(4)}`,
      name: `테스트트레이너${i}`,
      award: '수상 없음',
      career: '경력 없음',
      self_introduction: `잘부탁드립니다. 테스트 트레이너 ${i}번 입니다.`,
      profile_image: media,
    });
    seeds.push(trainer);
  }

  await trainerRepository.save(seeds);

  await appDataSource.destroy();

  Logger.log('트레이너 seeding을 종료합니다.');
  process.exit();
})();
