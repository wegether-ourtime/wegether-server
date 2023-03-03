import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserCategoryDto,
  QueryUserCategoryDto,
  UpdateUserCategoryDto,
} from '../dto';
import { UserCategory } from '../entities';

@Injectable()
export class UserCategoryService {
  constructor(
    @InjectRepository(UserCategory)
    private userCategoryRepository: Repository<UserCategory>,
  ) {}

  async find(query: QueryUserCategoryDto) {
    return await this.userCategoryRepository.find({ where: {} });
  }

  async findOne(userCategoryId: string) {
    return await this.userCategoryRepository.findOne({
      where: { userCategoryId },
    });
  }

  async create(dto: CreateUserCategoryDto) {
    return await this.userCategoryRepository.save(dto);
  }

  async update(userCategoryId: string, dto: UpdateUserCategoryDto) {
    return await this.userCategoryRepository.save(dto);
  }

  async delete(userCategoryId: string) {
    return await this.userCategoryRepository.delete(userCategoryId);
  }
}
