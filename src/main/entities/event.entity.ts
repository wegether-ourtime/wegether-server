import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  eventId: string;

  @Column({ name: ' event_name' })
  eventName: string;
  @Column({ name: ' eventDetail', nullable: true })
  eventDetail: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
