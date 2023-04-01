import { Expose, Type } from 'class-transformer';
import {
  ApiProperty,
  ApiResponseProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';
import { EventStatus } from 'src/common/enums/event-status.enum';
import { UserEvent } from '../entities';
import { CreateUserEventDto, UserEventDto } from './user-event.dto';
import { EventType } from 'src/common/enums/event-type.enum';

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
  @ApiResponseProperty()
  createdAt: Date;
  @Expose()
  @ApiResponseProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => UserEventDto)
  @ApiProperty({ type: UserEventDto, required: false })
  userEvents: UserEventDto[];
}

export class CreateEventDto extends OmitType(EventDto, [
  'eventId',
  'createdAt',
  'updatedAt',
  'userEvents',
]) {
  @Expose()
  @Type(() => CreateUserEventDto)
  @ApiProperty({ type: CreateUserEventDto, required: false })
  userEvents: CreateUserEventDto[];
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @Expose()
  @ApiProperty({ required: true })
  eventId: string;
}

export class QueryEventDto extends QueryDto {
  @Expose()
  @ApiProperty({ required: false })
  userId: string;
  @Expose()
  @ApiProperty({ required: false })
  categoriesId: string[];
  @Expose()
  @ApiProperty({ required: false })
  startDate: Date;
  @Expose()
  @ApiProperty({ required: false })
  endDate: Date;
  @Expose()
  @ApiProperty({ required: false })
  location: string;
  @Expose()
  @ApiProperty({ required: true, enum: EventType })
  eventType: EventType;
}

export class JoinEventDto {
  @Expose()
  @ApiProperty({ required: true })
  userId: string;
  @Expose()
  @ApiProperty({ required: true })
  code: string;
}
