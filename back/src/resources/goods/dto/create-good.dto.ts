import { IsString } from 'class-validator';
import { Supplier } from 'src/resources/supplier/entities/supplier.entity';

export class CreateGoodDto {
  @IsString()
  name: string;

  @IsString()
  supplier: Supplier;
}
