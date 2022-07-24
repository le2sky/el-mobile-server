import { PartialType } from '@nestjs/swagger';
import { CustomerEntity } from 'src/database/entities/customer.entity';

export class UpdateUserDto extends PartialType(CustomerEntity) {}
