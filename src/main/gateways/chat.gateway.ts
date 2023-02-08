import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatDto, CreateChatDto } from '../dto';
import { ChatService } from '../services';

@WebSocketGateway({
  path: '/chat',
  cors: true,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}
  // @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, dto: ChatDto) {
    const { receiverId, eventId } = dto;
    let channel: string;
    if (eventId) channel = `receive-event-message-${eventId}`;
    else if (receiverId) channel = `receive-friend-message-${receiverId}`;

    client.emit(channel, dto);
    await this.chatService.create(dto);
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Do stuffs
  }
}
