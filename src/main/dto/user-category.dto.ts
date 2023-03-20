import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class UserCategoryDto {
  @Expose()
  userCategoryId: string;

  @Expose()
  userId: string;
  @Expose()
  categoryId: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateUserCategoryDto extends OmitType(UserCategoryDto, [
  'userCategoryId',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateUserCategoryDto extends PartialType(
  OmitType(CreateUserCategoryDto, ['categoryId']),
) {
  @Expose()
  @ApiProperty({ required: true })
  categoriesId: string[];
}

export class QueryUserCategoryDto extends QueryDto {
  @Expose()
  userId: string;
  @Expose()
  categoryId: string;
}
