import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(5000)
  description: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string; // UUID of the Category row

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(0.5)
  @Max(9999)
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  priceAfterDiscount?: number;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];
}
