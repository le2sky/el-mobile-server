import { PickType } from '@nestjs/swagger';
import { UsersEntity } from 'src/database/entities/user.entity';

export class CreateUserDto extends PickType(UsersEntity, [
  `email`,
  `nickName`,
  `password`,
  `user_id`,
  `agree_marketing`,
  `agree_info`,
  `push_notification`,
  'gender',
] as const) {}
