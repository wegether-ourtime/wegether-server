import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from '../dto';
import { Event } from '../entities';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async find() {
    return await this.eventRepository.find({ where: {} });
  }

  async create(dto: CreateEventDto) {
    return await this.eventRepository.save(dto);
  }

  async update(dto: UpdateEventDto) {
    return await this.eventRepository.save(dto);
  }

  async delete(userId: string) {
    return await this.eventRepository.delete(userId);
  }

  //   async findOne(){
  //     return;
  //   }
}
