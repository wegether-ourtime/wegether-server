import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from '../dto';
import { ChatService } from '../services';

@WebSocketGateway({
  path: '/chat',
  cors: true,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    //Do stuffs
  }

  @SubscribeMessage('new-message')
  async newMessage(dto: CreateChatDto) {
    await this.chatService.create(dto);
  }
}
