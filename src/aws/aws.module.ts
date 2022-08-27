import { Module } from '@nestjs/common';
import { AwsConfiguration } from './aws.configuration';
import { AwsProvider } from './aws.provider';

@Module({
  providers: [AwsProvider, AwsConfiguration],
  exports: [AwsProvider],
})
export class AwsModule {}
