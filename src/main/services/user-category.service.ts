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
    const { userId, categoryId } = query;
    return await this.userCategoryRepository.find({
      where: {
        ...(userId ? { userId } : {}),
        ...(categoryId ? { categoryId } : {}),
      },
    });
  }

  async findOne(userCategoryId: string) {
    return await this.userCategoryRepository.findOne({
      where: { userCategoryId },
    });
  }

  async create(dto: CreateUserCategoryDto) {
    return await this.userCategoryRepository.save(dto);
  }

  async update(dto: UpdateUserCategoryDto) {
    const { userId, categoriesId } = dto;
    await this.userCategoryRepository.delete({
      userId,
    });
    categoriesId.forEach(async (c) => {
      await this.userCategoryRepository.save({
        userId,
        categoryId: c,
      });
    });
  }

  async delete(userCategoryId: string) {
    return await this.userCategoryRepository.delete(userCategoryId);
  }
}
