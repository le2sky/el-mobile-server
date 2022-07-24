import { PickType } from '@nestjs/swagger';
import { CustomerEntity } from 'src/database/entities/customer.entity';

export class LoginRequestDto extends PickType(CustomerEntity, [
  'id',
  'password',
] as const) {}
