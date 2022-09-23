import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DietDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;
}
