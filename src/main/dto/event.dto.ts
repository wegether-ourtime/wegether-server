import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class EventDto {
  @Expose()
  eventId: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateEventDto extends OmitType(EventDto, [
  'eventId',
  'createdAt',
  'updatedAt',
]) {
  @Expose()
  @ApiProperty({ required: true })
  eventId: string;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @Expose()
  @ApiProperty({ required: true })
  eventId: string;
}

export class QueryEventDto extends QueryDto {}
