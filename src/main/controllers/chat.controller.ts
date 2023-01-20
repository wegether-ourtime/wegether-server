import {
  ClassSerializerInterceptor,
  Controller,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services';
import { ChatService } from '../services/chat.service';

@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class ChatController {
  constructor(private chatService: ChatService) {}
}
