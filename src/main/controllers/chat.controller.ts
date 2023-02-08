import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../services/chat.service';

@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/:userFriendId')
  getEvents(@Param('userFriendId') userFriendId: string) {
    return this.chatService.findDirectMessage(userFriendId);
  }

  @Get('/:eventId')
  getEvent(@Param('eventId') eventId: string) {
    return this.chatService.findEventMessage(eventId);
  }
}
