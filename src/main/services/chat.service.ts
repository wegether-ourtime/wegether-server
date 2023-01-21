import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto, UpdateChatDto } from '../dto';
import { Chat } from '../entities';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async find() {
    return await this.chatRepository.find({ where: {} });
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

  //   async findOne(){
  //     return;
  //   }
}
