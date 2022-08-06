import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from '../database/entities/media.entity';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/createVideo.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(MediaEntity)
    private MediaRepository: Repository<MediaEntity>,
  ) {}

  async create(dto: CreateVideoDto) {
    return await this.MediaRepository.save(dto);
  }
}
