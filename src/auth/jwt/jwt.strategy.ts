import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      //jwt config
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_secretKey,
      ignoreExpiration: false,
    });
  }
  async validate(payload: Payload) {
    const user = await this.userService.getOneWithId(payload.sub);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
