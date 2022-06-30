import { Body, Controller, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateVideoDto } from './dto/createVideo.dto';
import { VideoService } from './video.service';

@Controller('video')
@UseInterceptors(SuccessInterceptor)
export class VideoController {
  constructor(private videoService: VideoService) {}
  async create(@Body() dto: CreateVideoDto) {
    return await this.videoService.create(dto);
  }
}
