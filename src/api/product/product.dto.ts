import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { IsGreaterThan } from "../../utils/greater-than.validator";
import { Type } from "class-transformer";

export class ProductQueryDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minPrice: number;

  @IsOptional()
  @IsNumber()
  @IsGreaterThan('minPrice', {
    message: 'maxPrice should be greater than minPrice'
  })
  @Min(0)
  @Type(() => Number)
  maxPrice: number;
}