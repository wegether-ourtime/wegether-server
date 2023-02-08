import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  chatId: string;

  @Column({ name: 'sender_id' })
  senderId: string;
  @Column({ name: 'receiver_id', nullable: true })
  receiverId: string;
  @Column({ name: 'user_friend_id', nullable: true })
  userFriendId: string;
  @Column({ name: 'event_id', nullable: true })
  eventId: string;

  @Column({ name: 'text' })
  text: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
