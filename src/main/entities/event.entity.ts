import { VirtualColumn } from 'src/common/decorators/virtual-column.decorator';
import { CancelEventReason } from 'src/common/enums/cancel-event-reason.enum';
import { EventStatus } from 'src/common/enums/event-status.enum';
import { FileResource } from 'src/common/enums/file-resource.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { Chat } from './chat.entity';
import { EventCategory } from './event-category.entity';
import { File } from './file.entity';
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
  @Column({ name: 'host_id', nullable: true })
  hostId: string;
  @Column({ name: 'cancel_event_reason', nullable: true })
  cancelEventReason: CancelEventReason;
  @Column({ name: 'max_participant', default: 2 })
  maxParticipant: number;
  @Column({ name: 'start_date', nullable: true })
  startDate: Date;
  @Column({ name: 'end_date', nullable: true })
  endDate: Date;
  @Column({ name: 'location', nullable: true, type: 'jsonb' })
  location: string;

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
  @OneToMany(() => File, (file) => file.event, {
    cascade: true,
  })
  files: File[];
  @OneToMany(() => Chat, (chat) => chat.event, {
    cascade: true,
  })
  chats: Chat[];

  participant: number;
  chatCount: number;
  imgUrl: string;

  @AfterLoad()
  getParticipantCount() {
    this.participant = this.userEvents?.length ?? 0;
  }

  @AfterLoad()
  getChatCount() {
    this.chatCount = this.chats?.length ?? 0;
  }
  @AfterLoad()
  getImgProfile() {
    this.imgUrl = this.files?.find(
      (f) => f.resource === FileResource.EVENT,
    )?.path;
  }
}
