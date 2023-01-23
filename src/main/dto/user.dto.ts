import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class UserDto {
  @Expose()
  userId: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateUserDto extends OmitType(UserDto, [
  'userId',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Expose()
  @ApiProperty({ required: true })
  userId: string;
}

export class QueryUserDto extends QueryDto {}
