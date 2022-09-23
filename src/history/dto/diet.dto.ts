import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  image?: string;

  getDescripion() {
    return `${this.title}/${this.amount}/${this.score}`;
  }
}
