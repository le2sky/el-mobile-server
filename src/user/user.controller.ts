import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CustomerEntity } from 'src/database/entities/customer.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  async auth_test(@User() user: CustomerEntity) {
    return `[인가 성공] 사용자: ${user.name}`;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') userId: number) {
    return await this.userService.getOneWithId(userId);
  }

  @HttpCode(200)
  @Post('login')
  logIn(@Body() dto: LoginRequestDto) {
    return this.authService.jwtLogIn(dto);
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
  async delete(@Param('id') userId: number) {
    return await this.userService.delete(userId);
  }
}
