import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class UserFriendDto {
  @Expose()
  userFriendId: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateUserFriendDto extends OmitType(UserFriendDto, [
  'userFriendId',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateUserFriendDto extends PartialType(CreateUserFriendDto) {
  @Expose()
  @ApiProperty({ required: true })
  userFriendId: string;
}

export class QueryUserFriendDto extends QueryDto {}
