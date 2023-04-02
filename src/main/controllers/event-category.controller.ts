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
import { EventCategoryService } from '../services';
import { CreateEventCategoryDto, QueryEventCategoryDto, UpdateEventCategoryDto } from '../dto';

@ApiTags('event-category')
@ApiBearerAuth()
@Controller('event-category')
@UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class EventCategoryController {
  constructor(private eventCategoryService: EventCategoryService) {}

//   @Get('')
//   getEventCategorys(@Query() query: QueryEventCategoryDto) {
//     return this.eventCategoryService.find(query);
//   }

//   @Get('/:id')
//   getEventCategory(@Param('id') id: string) {
//     return this.eventCategoryService.findOne(id);
//   }

//   @Post('')
//   createEventCategory(@Body() dto: CreateEventCategoryDto) {
//     return this.eventCategoryService.create(dto);
//   }

//   @Post('/:id')
//   updateEventCategory(@Param('id') id: string, @Body() dto: UpdateEventCategoryDto) {
//     return this.eventCategoryService.update(id, dto);
//   }

//   @Delete('')
//   deleteEventCategory(@Param('id') id: string) {
//     return this.eventCategoryService.delete(id);
//   }
}
