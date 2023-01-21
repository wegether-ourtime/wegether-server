import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryController,
  ChatController,
  EventController,
  UserController,
} from './controllers';
import {
  Category,
  Chat,
  Event,
  EventCategory,
  User,
  UserCategory,
  UserEvent,
  UserFriend,
} from './entities';
import { ChatGateway } from './gateways';
import {
  CategoryService,
  ChatService,
  EventService,
  UserService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Chat,
      Event,
      User,
      UserCategory,
      UserEvent,
      UserFriend,
      EventCategory,
    ]),
  ],
  controllers: [
    CategoryController,
    ChatController,
    EventController,
    UserController,
  ],
  providers: [
    ChatGateway,
    CategoryService,
    ChatService,
    EventService,
    UserService,
  ],
})
export class MainModule {}
