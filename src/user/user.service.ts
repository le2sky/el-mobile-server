import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/database/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async findOneBy(
    where: FindOptionsWhere<UsersEntity> | FindOptionsWhere<UsersEntity>[],
  ) {
    return this.usersRepository.findOneBy(where);
  }

  async getOne(userId: number) {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  async signUp(dto: CreateUserDto) {
    return await this.usersRepository.save({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });
  }

  async update(userId: number, dto: UpdateUserDto) {
    return await this.usersRepository.update(1, dto);
  }

  async delete(userId: number) {
    return await this.usersRepository.delete(userId);
  }
}
