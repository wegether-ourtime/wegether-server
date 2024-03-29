import { FileResource } from 'src/common/enums/file-resource.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  AfterLoad,
} from 'typeorm';
import { Event } from './event.entity';
import { UserFriend } from './user-friend.entity';
import { User } from './user.entity';

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

  @ManyToOne(() => UserFriend, (userFriend) => userFriend.chats)
  @JoinColumn({ name: 'user_friend_id' })
  userFriend: UserFriend;
  @ManyToOne(() => Event, (event) => event.chats)
  @JoinColumn({ name: 'event_id' })
  event: Event;
  // @ManyToOne(() => User, (sender) => sender.)
  // @JoinColumn({ name: 'sender_id' })
  // sender: User;

  senderImg: string;

  @AfterLoad()
  getSenderImg() {
    if (this.userFriendId) {
      this.senderImg = this.userFriend?.user?.files?.find(
        (f) => f.resource === FileResource.USER_PROFILE,
      )?.path;
    } else {
      this.senderImg = this.event?.userEvents
        ?.find((ue) => ue.userId === this.senderId)
        .user.files?.find(
          (f) => f.resource === FileResource.USER_PROFILE,
        )?.path;
    }
  }
}
