import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { CustomerEntity } from '../database/entities/customer.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@ApiTags('회원(Customer)')
@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '로그인 사용자 정보 조회',
    description:
      '주어진 jwt 토큰을 사용해 현재 로그인 중인 유저의 정보를 얻습니다.',
  })
  async getUser(@User() user: CustomerEntity) {
    return user;
  }

  @Get('auth')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '인가 테스트',
    description:
      '주어진 jwt 토큰을 이용해서 인가를 테스트 하기 위한 용도입니다.',
  })
  async auth_test(@User() user: CustomerEntity) {
    return `[인가 성공] 사용자: ${user.name}`;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '회원 조회',
    description: 'userId를 기반으로 유저 한명을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '레코드가 성공적으로 조회 됐습니다.',
  })
  async getOne(@Param('id') userId: number) {
    return await this.userService.getOneWithId(userId);
  }

  /**
   *
   * @param {LoginRequestDto} dto 로그인 요청 DTO
   * @description 로그인을 수행한 후, 성공일 경우 jwt 토큰을 반환합니다.
   */
  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: '로그인이 성공적으로 수행 됐습니다.',
  })
  @ApiOperation({
    summary: '로그인',
    description:
      'LoginRequestDto를 통해서 로그인을 수행합니다. 로그인 성공시 서버는 jwt 토큰을 전달합니다.',
  })
  logIn(@Body() dto: LoginRequestDto) {
    return this.authService.jwtLogIn(dto);
  }

  /**
   *
   * @param {CreateUserDto} dto 회원가입 요청 DTO
   * @description 회원가입 로직을 수행합니다.
   */
  @Post()
  @ApiResponse({
    status: 201,
    description: '레코드가 성공적으로 생성 됐습니다.',
  })
  @ApiOperation({
    summary: '회원가입',
    description: 'CreateUserDto를 통해서 회원가입을 수행합니다.',
  })
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.signUp(dto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '레코드가 성공적으로 업데이트 됐습니다.',
  })
  @ApiOperation({
    summary: '회원 업데이트',
    description:
      'jwt 토큰과 UpdateUserDto를 기반으로 회원을 업데이트합니다.(may not work well)',
  })
  async update(@User() user: CustomerEntity, @Body() dto: UpdateUserDto) {
    return await this.userService.update(user.customer_id, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '레코드가 성공적으로 삭제 됐습니다.',
  })
  @ApiOperation({
    summary: '회원 삭제',
    description: '주어진 jwt 토큰을 이용해서 회원을 삭제합니다.',
  })
  async delete(@User() user: CustomerEntity) {
    return await this.userService.delete(user.customer_id);
  }

  @Post('profileImage')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 201,
    description: '레코드가 성공적으로 생성 됐습니다.',
  })
  @ApiOperation({
    summary: '회원 프로필 이미지 설정',
    description: '주어진 이미지를 통해 사용자의 프로필 이미지를 설정합니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async setProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @User() user: CustomerEntity,
  ) {
    return await this.userService.setProfileImage(user.customer_id, file);
  }
}
