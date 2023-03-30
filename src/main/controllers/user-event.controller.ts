import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserEventDto, QueryUserEventDto } from '../dto';
import { UserEventService } from '../services';

@ApiTags('user-event')
@ApiBearerAuth()
@Controller('user-event')
@UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class UserEventController {
  constructor(private userEventService: UserEventService) {}

  @Get()
  getUserCategorys(@Query() query: QueryUserEventDto) {
    return this.userEventService.find(query);
  }

  @Post()
  createEvent(@Body() dto: CreateUserEventDto) {
    return this.userEventService.create(dto);
  }
}
