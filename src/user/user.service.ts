import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../database/entities/customer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { AwsProvider } from '../aws/aws.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,

    private awsProvider: AwsProvider,
  ) {}

  async getOneWithId(userId: number) {
    return await this.customerRepository.findOneBy({ customer_id: userId });
  }

  async getOneWithUserId(id: string) {
    return await this.customerRepository.findOneBy({ id });
  }

  async signUp(dto: CreateUserDto) {
    return await this.customerRepository.save({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });
  }

  async update(userId: number, dto: UpdateUserDto) {
    return await this.customerRepository.update(userId, dto);
  }

  async delete(userId: number) {
    return await this.customerRepository.delete(userId);
  }

  async setProfileImage(userId: number, file: Express.Multer.File) {
    const s3Obj = await this.awsProvider.upload('user_profile', file);
    const media = await this.awsProvider.createMedia(s3Obj.key, 'image');
    return await this.customerRepository.update(userId, {
      profile_image: media.media_id,
    });
  }
}
