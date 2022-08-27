import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CustomerEntity } from '../database/entities/customer.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
