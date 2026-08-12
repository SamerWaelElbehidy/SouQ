import { IsIn, IsInt, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

const SORT_VALUES = ['newest', 'oldest', 'price_asc', 'price_desc', 'popular'] as const;
type SortValue = (typeof SORT_VALUES)[number];

export class QueryProductsDto {
  /** Filter by category slug or category id */
  @IsOptional()
  @IsString()
  category?: string;

  /** Full-text search across name + description */
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsIn(SORT_VALUES)
  sort?: SortValue;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(50)
  perPage?: number = 12;

  /** Only show approved products to the public (default true) */
  @IsOptional()
  approvedOnly?: boolean = true;
}
