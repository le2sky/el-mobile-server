import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from 'src/database/entities/media.entity';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
