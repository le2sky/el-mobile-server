import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'root',
      port: 3306,
      username: 'root',
      password: process.env.DB_ROOT_PW || 'root',
      database: process.env.DB_NAME || 'el-db-mysql',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    VideoModule,
    AuthModule,
  ],
})
export class AppModule {}
