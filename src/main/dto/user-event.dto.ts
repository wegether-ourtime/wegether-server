import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class UserEventDto {
  @Expose()
  userEventId: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateUserEventDto extends OmitType(UserEventDto, [
  'userEventId',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateUserEventDto extends PartialType(CreateUserEventDto) {
  @Expose()
  @ApiProperty({ required: true })
  userEventId: string;
}

export class QueryUserEventDto extends QueryDto {}
