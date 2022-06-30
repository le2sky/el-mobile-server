import { PickType } from '@nestjs/swagger';
import { UsersEntity } from 'src/database/entities/user.entity';

export class LoginRequestDto extends PickType(UsersEntity, [
  'email',
  'password',
] as const) {}
