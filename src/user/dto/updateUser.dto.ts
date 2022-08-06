import { PartialType } from '@nestjs/swagger';
import { CustomerEntity } from '../../database/entities/customer.entity';

export class UpdateUserDto extends PartialType(CustomerEntity) {}
