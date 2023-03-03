import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, QueryCategoryDto, UpdateCategoryDto } from '../dto';
import { Category } from '../entities';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async find(query: QueryCategoryDto) {
    return await this.categoryRepository.find({ where: {} });
  }

  async findOne(categoryId: string) {
    return await this.categoryRepository.findOne({ where: { categoryId } });
  }

  async create(dto: CreateCategoryDto) {
    return await this.categoryRepository.save(dto);
  }

  async update(categoryId: string, dto: UpdateCategoryDto) {
    return await this.categoryRepository.save(dto);
  }

  async delete(categoryId: string) {
    return await this.categoryRepository.delete(categoryId);
  }
}
