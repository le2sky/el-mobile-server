import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getOne(@Param('id') userId: number) {
    return await this.userService.getOne(userId);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.signUp(dto);
  }

  @Patch(':id')
  async update(@Param('id') userId: number, @Body() dto: UpdateUserDto) {
    return await this.userService.update(userId, dto);
  }

  @Delete(':id')
  async deletet(@Param('id') userId: number) {
    return await this.userService.delete(userId);
  }
}
