import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto, QueryEventDto, UpdateEventDto } from '../dto';
import { Event } from '../entities';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async find(query: QueryEventDto) {
    const { categoriesId } = query;
    const qb = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.eventCategories', 'eventCategories')
    //   .leftJoinAndSelect('eventCategories.category', 'category');

    // if (categoriesId?.length > 0)
    //   qb.where('id IN(:...categoriesId)', { categoriesId });

    return await qb.getMany();
  }

  async findOne(eventId: string) {
    return await this.eventRepository.findOne({ where: { eventId } });
  }

  async create(dto: CreateEventDto) {
    return await this.eventRepository.save(dto);
  }

  async update(id: string, dto: UpdateEventDto) {
    return await this.eventRepository.save(dto);
  }

  async delete(userId: string) {
    return await this.eventRepository.delete(userId);
  }

  //   async findOne(){
  //     return;
  //   }
}
