import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class CategoryDto {
  @Expose()
  categoryId: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateCategoryDto extends OmitType(CategoryDto, [
  'categoryId',
  'createdAt',
  'updatedAt',
]) {
  @Expose()
  @ApiProperty({ required: true })
  categoryId: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Expose()
  @ApiProperty({ required: true })
  categoryId: string;
}

export class QueryCategoryDto extends QueryDto {}
