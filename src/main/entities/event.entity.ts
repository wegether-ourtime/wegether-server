import { EventStatus } from 'src/common/enums/event-status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EventCategory } from './event-category.entity';
import { UserEvent } from './user-event.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  eventId: string;

  @Column({ name: 'event_name' })
  eventName: string;
  @Column({ name: 'event_detail', nullable: true })
  eventDetail: string;
  @Column({ name: 'status', default: EventStatus })
  status: EventStatus;
  @Column({ name: 'max_participant', default: 2 })
  maxParticipant: number;
  @Column({ name: 'start_date', nullable: true })
  startDate: Date;
  @Column({ name: 'end_date', nullable: true })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // EventCategory
  @OneToMany(() => EventCategory, (eventCategories) => eventCategories.event, {
    cascade: true,
  })
  eventCategories: EventCategory[];
  @OneToMany(() => UserEvent, (userEvents) => userEvents.event, {
    cascade: true,
  })
  userEvents: UserEvent[];
}
