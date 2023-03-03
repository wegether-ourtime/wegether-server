import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryController,
  ChatController,
  EventController,
  UserController,
} from './controllers';
import { EventCategoryController } from './controllers/event-category.controller';
import { LocationController } from './controllers/location.controller';
import { UserCategoryController } from './controllers/user-category.controller';
import { UserEventController } from './controllers/user-event.controller';
import { UserFriendController } from './controllers/user-frined.controller';
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
  EventCategoryService,
  EventService,
  UserCategoryService,
  UserEventService,
  UserService,
} from './services';
import { LocationService } from './services/location.service';
import { UserFriendService } from './services/user-friend.service';

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
    HttpModule,
  ],
  controllers: [
    CategoryController,
    ChatController,
    EventController,
    UserController,
    LocationController,
    UserEventController,
    UserFriendController,
    EventCategoryController,
    UserCategoryController,
  ],
  providers: [
    ChatGateway,
    CategoryService,
    ChatService,
    EventService,
    UserService,
    LocationService,
    UserEventService,
    UserCategory,
    UserFriendService,
    EventCategoryService,
    UserCategoryService,
  ],
})
export class MainModule {}
