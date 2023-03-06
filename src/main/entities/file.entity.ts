import { FileResource } from 'src/common/enums/file-resource.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'file_name' })
  fileName: string;
  @Column({ name: 'file_type' })
  fileType: string;
  @Column({ name: 'path' })
  path: string;
  @Column({
    name: 'resource',
    type: 'enum',
    enum: FileResource,
  })
  resource: string;
  @Column({ name: 'user_id', nullable: true })
  userId: string;
  @Column({ name: 'event_id', nullable: true })
  eventId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.files, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Event, (event) => event.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
