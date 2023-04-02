import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../services/chat.service';
import { CreateChatDto, QueryChatDto } from '../dto';

@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('')
  getChatList(@Query() query: QueryChatDto) {
    return this.chatService.findAll(query);
  }

  @Get('/direct/:userFriendId')
  getDirectMessage(@Param('userFriendId') userFriendId: string) {
    return this.chatService.findDirectMessage(userFriendId);
  }

  @Get('/event/:eventId')
  getEventMessage(@Param('eventId') eventId: string) {
    return this.chatService.findEventMessage(eventId);
  }

  @Get('/get-user-friend-chat-list/:userId')
  getUserFriendChatList(@Param('userId') userId: string) {
    return this.chatService.findUserFriendChatList(userId);
  }

  @Get('/get-event-chat-list/:userId')
  getEventChatList(@Param('userId') userId: string) {
    return this.chatService.findEventChatList(userId);
  }

  @Post('')
  createChat(@Body() dto: CreateChatDto) {
    return this.chatService.create(dto);
  }
}
