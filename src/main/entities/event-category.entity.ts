import { EventStatus } from 'src/common/enums/event-status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class EventCategory {
  @PrimaryGeneratedColumn('uuid')
  eventCategoryId: string;

  @Column({ name: ' event_id' })
  eventId: string;
  @Column({ name: ' category_id' })
  categoryId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
