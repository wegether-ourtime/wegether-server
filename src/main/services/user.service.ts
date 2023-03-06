import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async find(query: QueryUserDto) {
    return await this.userRepository.find({ where: {} });
  }

  async findOne(userId: string) {
    return await this.userRepository.findOne({ where: { userId }, relations: ['files'] });
  }

  async create(dto: CreateUserDto) {
    return await this.userRepository.save(dto);
  }

  async update(userId: string, dto: UpdateUserDto) {
    return await this.userRepository.save(dto);
  }

  async delete(userId: string) {
    return await this.userRepository.delete(userId);
  }
}
