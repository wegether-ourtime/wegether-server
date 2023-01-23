import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class EventCategoryDto {
  @Expose()
  eventCategoryId: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateEventCategoryDto extends OmitType(EventCategoryDto, [
  'eventCategoryId',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateEventCategoryDto extends PartialType(
  CreateEventCategoryDto,
) {
  @Expose()
  @ApiProperty({ required: true })
  eventCategoryId: string;
}

export class QueryEventCategoryDto extends QueryDto {}
