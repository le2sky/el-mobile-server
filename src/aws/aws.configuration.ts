import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsConfiguration implements OnModuleInit {
  constructor(configService: ConfigService) {}

  onModuleInit() {}
}
