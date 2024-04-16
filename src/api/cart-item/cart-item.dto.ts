import { Type } from "class-transformer";
import { IsInt, IsMongoId, Min } from "class-validator";

export class CreateCartItemDTO {
  @IsMongoId()
  productId: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}

export class UpdateQuantityDTO {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}