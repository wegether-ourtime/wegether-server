import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreateEventDto, QueryEventDto, UpdateEventDto } from '../dto';
import { Event } from '../entities';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async find(query: QueryEventDto) {
    const { userId, categoriesId, search } = query;
    const qb = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.eventCategories', 'eventCategories')
      .leftJoinAndSelect('event.userEvents', 'userEvents');
    //   .leftJoinAndSelect('eventCategories.category', 'category');

    // if (categoriesId?.length > 0)
    //   qb.where('id IN(:...categoriesId)', { categoriesId });

    search &&
      qb.andWhere(
        new Brackets((qb) =>
          qb
            .where(`event.eventName like :search`, {
              search: `%${search}%`,
            })
            .orWhere(`event.eventDetail like :search`, { search: `%${search}%` })
        ),
      );
    userId && qb.andWhere('userEvents.userId = :userId', { userId });

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
