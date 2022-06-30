import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from 'src/database/entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/createVideo.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async create(dto: CreateVideoDto) {
    return await this.videoRepository.save(dto);
  }
}
