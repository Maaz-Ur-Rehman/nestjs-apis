import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class GetMultipleCategoriesDto {
  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsArray()
  overall_rating?: number[];

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
