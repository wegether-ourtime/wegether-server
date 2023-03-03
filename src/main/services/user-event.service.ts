import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserEventDto,
  QueryUserEventDto,
  UpdateUserEventDto,
} from '../dto';
import { UserEvent } from '../entities';

@Injectable()
export class UserEventService {
  constructor(
    @InjectRepository(UserEvent)
    private userEventRepository: Repository<UserEvent>,
  ) {}

  //   async find(query: QueryUserEventDto) {
  //     return await this.userEventRepository.find({ where: {} });
  //   }

  //   async findOne(userEventId: string) {
  //     return await this.userEventRepository.findOne({ where: { userEventId } });
  //   }

  async create(dto: CreateUserEventDto) {
    return await this.userEventRepository.save(dto);
  }

  //   async update(dto: UpdateUserEventDto) {
  //     return await this.userEventRepository.save(dto);
  //   }

  async delete(userEventId: string) {
    return await this.userEventRepository.delete(userEventId);
  }
}
