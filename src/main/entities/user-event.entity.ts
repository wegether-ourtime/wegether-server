import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';

@Entity()
export class UserEvent {
  @PrimaryGeneratedColumn('uuid')
  userEventId: string;

  @Column({ name: 'user_id' })
  userId: string;
  @Column({ name: 'event_id' })
  eventId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Event, { eager: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
