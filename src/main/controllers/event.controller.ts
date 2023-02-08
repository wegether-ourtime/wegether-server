import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventService } from '../services';
import { CreateEventDto, QueryEventDto, UpdateEventDto } from '../dto';

@ApiTags('event')
@ApiBearerAuth()
@Controller('event')
@UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('')
  getEvents(@Query() query: QueryEventDto) {
    return this.eventService.find(query);
  }

  @Get('/:id')
  getEvent(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Post('')
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Post('/:id')
  updateEvent(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto);
  }

  @Delete('')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.delete(id);
  }
}
