import { PartialType } from '@nestjs/swagger';
import { UsersEntity } from 'src/database/entities/user.entity';

export class UpdateUserDto extends PartialType(UsersEntity) {}
