import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';
import { EventStatus } from 'src/common/enums/event-status.enum';

export class EventDto {
  @Expose()
  eventId: string;

  @Expose()
  @ApiProperty({ required: true })
  eventName: string;
  @Expose()
  @ApiProperty({ required: false })
  eventDetail: string;
  @Expose()
  @ApiProperty({ required: false })
  status: EventStatus;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateEventDto extends OmitType(EventDto, [
  'eventId',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @Expose()
  @ApiProperty({ required: true })
  eventId: string;
}

export class QueryEventDto extends QueryDto {}
