import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from '../database/entities/media.entity';
import { AwsProvider } from './aws.provider';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity])],
  providers: [AwsProvider],
  exports: [AwsProvider],
})
export class AwsModule {}
