import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class UserCategoryDto {
  @Expose()
  userCategoryId: string;

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

export class UpdateUserCategoryDto extends PartialType(CreateUserCategoryDto) {
  @Expose()
  @ApiProperty({ required: true })
  userCategoryId: string;
}

export class QueryUserCategoryDto extends QueryDto {}
