import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IHistory } from './Ihistory';

export class WorkoutDto implements IHistory {
  @ApiProperty({ type: 'number', required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  index: number;

  @ApiProperty({ type: [String], required: true })
  @Transform((v) =>
    typeof v.value === 'string' ? v.value.split(',') : v.value,
  )
  @IsNotEmpty()
  parts: string[];

  @ApiProperty({ type: 'number', required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  sets: number;

  @ApiProperty({ type: 'number', required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  reps: number;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  degree: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file?: Express.Multer.File;

  time?: string;
  video?: string;

  getDescripion() {
    return `${this.index}/${this.sets}/${this.reps}/${
      this.degree
    }/${this.parts.join(',')}`;
  }
}
