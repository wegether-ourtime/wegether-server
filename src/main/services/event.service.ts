import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType } from 'src/common/enums/event-type.enum';
import { Brackets, Repository } from 'typeorm';
import {
  CreateEventDto,
  JoinEventDto,
  QueryEventDto,
  UpdateEventDto,
} from '../dto';
import { Event, UserEvent } from '../entities';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(UserEvent)
    private userEventRepository: Repository<UserEvent>,
  ) {}

  async find(query: QueryEventDto) {
    const { userId, categoriesId, search, eventType } = query;
    const qb = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.eventCategories', 'eventCategories')
      .leftJoinAndSelect('event.userEvents', 'userEvents')
      .leftJoinAndSelect('event.files', 'files')
      .leftJoinAndSelect('userEvents.user', 'user')
      .leftJoinAndSelect('user.files', 'userFiles');
    // .leftJoinAndSelect(
    //   (q) =>
    //     q
    //       .select()
    //       .from(UserEvent, 'userEvent')
    //       .orderBy('userEvent.createdAt', 'ASC'),
    //   'userFiles',
    //   'userEvent.userId = user.userId',
    // );

    //   .leftJoinAndSelect('eventCategories.category', 'category');

    categoriesId?.length > 0 &&
      qb.andWhere('eventCategories.categoryId IN(:...categoriesId)', {
        categoriesId,
      });

    if (eventType === EventType.SUGGESTION) {
      qb.addOrderBy('event.createdAt', 'DESC');
      // .andWhere(
      //   'userEvents.userId = :userId',
      //   { userId },
      // );
    } else if (eventType === EventType.INCOMING) {
      // qb.andWhere('userEvents.userId = :userId', { userId })
      qb.andWhere('event.startDate >= :now', { now: new Date() }).addOrderBy(
        'event.startDate',
        'DESC',
      );
    } else if (eventType === EventType.HOSTED) {
      // qb.andWhere('userEvents.userId = :userId', { userId })
      // qb.andWhere('userEvents.isHost = true')
      qb.addOrderBy('event.createdAt', 'DESC');
    } else if (eventType === EventType.JOINED) {
      // qb.andWhere('userEvents.userId = :userId', { userId })
      //   .andWhere('userEvents.isHost = false')
      qb.addOrderBy('event.updatedAt', 'DESC');
    }

    search &&
      qb.andWhere(
        new Brackets((qb) =>
          qb
            .where(`event.eventName like :search`, {
              search: `%${search}%`,
            })
            .orWhere(`event.eventDetail like :search`, {
              search: `%${search}%`,
            }),
        ),
      );
    // userId && qb.andWhere('userEvents.userId = :userId', { userId });

    return await qb.getMany().then((events) => {
      if (eventType === EventType.SUGGESTION) {
        return events.filter(
          (e: Event) =>
            e.maxParticipant > e.participant &&
            !e.userEvents.find((ue) => ue.userId === userId),
        );
      } else if (eventType === EventType.INCOMING) {
        return events.filter((e: Event) =>
          e.userEvents.find((ue) => ue.userId === userId),
        );
      } else if (eventType === EventType.JOINED) {
        return events.filter((e: Event) =>
          e.userEvents.find((ue) => ue.userId === userId && !ue.isHost),
        );
      } else if (eventType === EventType.HOSTED) {
        return events.filter((e: Event) =>
          e.userEvents.find((ue) => ue.userId === userId && ue.isHost),
        );
      }
      // if ()
      // return events;
    });
  }

  async findOne(eventId: string) {
    return await this.eventRepository
      .createQueryBuilder('event')
      .where({ eventId })
      .leftJoinAndSelect('event.eventCategories', 'eventCategories')
      .leftJoinAndSelect('event.userEvents', 'userEvents')
      .leftJoinAndSelect('event.files', 'files')
      .getOneOrFail();
  }

  async create(dto: CreateEventDto) {
    return await this.eventRepository.save({
      ...dto,
      code: (Math.random() + 1).toString(36).substring(6).toUpperCase(),
    });
  }

  async update(id: string, dto: UpdateEventDto) {
    return await this.eventRepository.save(dto);
  }

  async delete(userId: string) {
    return await this.eventRepository.delete(userId);
  }

  async joinEvent(dto: JoinEventDto) {
    const { code, userId } = dto;
    const event = await this.eventRepository.findOne({ where: { code } });
    let userEvent;
    if (event) {
      userEvent = await this.userEventRepository.update(
        {
          eventId: event.eventId,
          userId,
        },
        {
          actuallyJoin: true,
        },
      );
    }
    
    return userEvent;
  }
}
