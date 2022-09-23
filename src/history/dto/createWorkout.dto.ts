import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateWorkoutDto {
  @IsString({ each: true })
  @IsNotEmpty()
  parts: string[];

  @IsNumber()
  @IsNotEmpty()
  sets: number;

  @IsNumber()
  @IsNotEmpty()
  reps: number;

  @IsString()
  @IsNotEmpty()
  degree: string;
}
