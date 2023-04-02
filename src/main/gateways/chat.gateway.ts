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
  path: '/chat-gateway',
  cors: true,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}
  // @WebSocketServer() server: Server;

  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, dto: ChatDto) {
    const { senderId, userFriendId, eventId } = dto;
    let channel: string;
    if (eventId) channel = `receive-event-message-${eventId}`;
    else if (userFriendId) channel = `receive-direct-message-${userFriendId}`;

    const data = this.chatService.create(dto);
    client.emit(channel, data);
  }

  afterInit(server: Server) {
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
