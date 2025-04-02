import { Type } from 'class-transformer';
import { IsNumber, Min, IsOptional } from 'class-validator';

export class GetAsCsvQueryDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'minWorth must be at least 0' })
  minWorth?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'maxWorth must be at least 0' })
  maxWorth?: number;
}
