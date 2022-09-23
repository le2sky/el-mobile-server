import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import * as path from 'path';
import { MediaEntity } from '../database/entities/media.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AwsProvider {
  private awsS3: AWS.S3;
  private S3_BUCKET_NAME: string;

  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    private configService: ConfigService,
  ) {
    this.awsS3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_S3_SECRET_KEY'),
      region: this.configService.get<string>('AWS_S3_REGION'),
    });
    this.S3_BUCKET_NAME = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  async upload(
    category: string,
    file: Express.Multer.File,
  ): Promise<{
    key: string;
    s3Obj: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>;
    contentType: string;
  }> {
    try {
      const key = `${category}/${Date.now()}_${path.basename(
        file.originalname,
      )}`.replace(/ /g, '');
      const s3Obj = await this.awsS3
        .putObject({
          Bucket: this.S3_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ACL: 'public-read',
          ContentType: file.mimetype,
        })
        .promise();

      return { key, s3Obj, contentType: file.mimetype };
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('파일 업로드를 실패했습니다.');
    }
  }

  async createMedia(
    key: string,
    type: 'video' | 'sound' | 'image' | 'gif',
  ): Promise<MediaEntity> {
    const media = this.mediaRepository.create({
      path: key,
      media_type: type,
    });

    return await this.mediaRepository.save(media);
  }
}
