import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class DietDto {
  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: 'string', required: true })
  @Length(4, 4)
  @IsNumberString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({ type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  score: number;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;

  path?: string;

  getDescripion() {
    return `${this.title}/${this.amount}/${this.score}`;
  }
}
