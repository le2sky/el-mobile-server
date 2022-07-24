import { PickType } from '@nestjs/swagger';
import { CustomerEntity } from 'src/database/entities/customer.entity';

export class CreateUserDto extends PickType(CustomerEntity, [
  `password`,
  `id`,
  `name`,
  `phone_number`,
] as const) {}
