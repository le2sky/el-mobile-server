import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(dto: LoginRequestDto) {
    const { id, password } = dto;

    //* 아이디 체크
    const user = await this.userService.getOneWithUserId(id);

    if (!user) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }

    //* password 체크
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }

    const payload = {
      iss: 'server',
      aud: 'client',
      sub: user.customer_id,
      name: user.name,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
