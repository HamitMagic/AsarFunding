import { IsNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  amount: number;

  @IsString()
  measure: string;

  @IsNumber()
  expireAt: number;
}
