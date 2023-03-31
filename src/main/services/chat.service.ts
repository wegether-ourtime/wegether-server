import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFriendStatus } from 'src/common/enums/user-friend-status.enum';
import { Repository } from 'typeorm';
import { CreateChatDto, QueryChatDto, UpdateChatDto } from '../dto';
import { Chat, Event, UserFriend } from '../entities';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(UserFriend)
    private userFriendRepository: Repository<UserFriend>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async findAll(query: QueryChatDto) {
    let qb = this.chatRepository.createQueryBuilder('chat');
    return await qb.getMany();
  }

  async findDirectMessage(userFriendId: string) {
    return await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.userFriend', 'userFriend')
      .leftJoinAndSelect('userFriend.user', 'user')
      .leftJoinAndSelect('userFriend.friend', 'friend')
      .where({
        userFriendId,
      })
      .orderBy('chat.createdAt', 'DESC')
      .getMany();
    // return await this.chatRepository.find({
    //   where: { userFriendId },
    //   order: { createdAt: 'ASC' },
    // });
  }

  async findEventMessage(eventId: string) {
    return await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.event', 'event')
      .leftJoinAndSelect('event.userEvents', 'userEvents')
      .leftJoinAndSelect('userEvents.user', 'user')
      .leftJoinAndSelect('user.files', 'files')
      .where({
        eventId,
      })
      .orderBy('chat.createdAt', 'DESC')
      .getMany();
  }

  async create(dto: CreateChatDto) {
    return await this.chatRepository.save(dto);
  }

  async update(dto: UpdateChatDto) {
    return await this.chatRepository.save(dto);
  }

  async delete(userId: string) {
    return await this.chatRepository.delete(userId);
  }

  async findUserFriendChatList(userId: string) {
    let qb = this.userFriendRepository
      .createQueryBuilder('userFriend')
      .where({
        userId,
        status: UserFriendStatus.SUCCESS
      })
      .leftJoinAndSelect('userFriend.chats', 'chats')
      .leftJoinAndSelect('userFriend.friend', 'friend')
      .leftJoinAndSelect('friend.files', 'userFiles');
    // .loadRelationCountAndMap('userFriend.chatCount', 'userFriend.chat');
    // .groupBy('userFriend.userFriendId, chat.uesrFriendId');

    const result = await qb.getMany();
    return result;
  }

  async findEventChatList(userId: string) {
    let qb = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.userEvents', 'userEvents')
      .leftJoinAndSelect('event.files', 'file')
      .where('userEvents.userId = :userId', { userId })
      .leftJoinAndSelect('event.chats', 'chas');
    // .loadRelationCountAndMap('event.chatCount', 'event.chats');
    // .groupBy('userFriend.userFriendId, chat.uesrFriendId');

    const result = await qb.getMany();
    return result;
  }
}
