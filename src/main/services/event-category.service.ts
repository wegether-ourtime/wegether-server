import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateEventCategoryDto,
  QueryEventCategoryDto,
  UpdateEventCategoryDto,
} from '../dto';
import { EventCategory } from '../entities';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategory)
    private eventCategoryRepository: Repository<EventCategory>,
  ) {}

  async find(query: QueryEventCategoryDto) {
    return await this.eventCategoryRepository.find({ where: {} });
  }

  async findOne(eventCategoryId: string) {
    return await this.eventCategoryRepository.findOne({
      where: { eventCategoryId },
    });
  }

  async create(dto: CreateEventCategoryDto) {
    return await this.eventCategoryRepository.save(dto);
  }

  async update(eventCategoryId: string, dto: UpdateEventCategoryDto) {
    return await this.eventCategoryRepository.save(dto);
  }

  async delete(eventCategoryId: string) {
    return await this.eventCategoryRepository.delete(eventCategoryId);
  }
}
