import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFriendStatus } from 'src/common/enums/user-friend-status.enum';
import { Repository } from 'typeorm';
import {
  CreateUserFriendDto,
  QueryUserFriendDto,
  UpdateUserFriendDto,
} from '../dto';
import { UserFriend } from '../entities';

@Injectable()
export class UserFriendService {
  constructor(
    @InjectRepository(UserFriend)
    private userFriendRepository: Repository<UserFriend>,
  ) {}

  async find(query: QueryUserFriendDto) {
    return await this.userFriendRepository.find({ where: {} });
  }

  async findOne(userFriendId: string) {
    return await this.userFriendRepository.findOne({ where: { userFriendId } });
  }

  async create(dto: CreateUserFriendDto) {
    return await this.userFriendRepository.save(dto);
  }

  async update(userFriendId: string, dto: UpdateUserFriendDto) {
    return await this.userFriendRepository.save(dto);
  }

  async delete(userFriendId: string) {
    return await this.userFriendRepository.delete(userFriendId);
  }

  async findFriendRequest(userId: string) {
    return await this.userFriendRepository.find({
      where: { friendId: userId, status: UserFriendStatus.PENDING },
      relations: ['user', 'user.files']
    });
  }
}
