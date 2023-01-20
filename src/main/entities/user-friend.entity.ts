import { UserFriendStatus } from 'src/common/enums/user-friend-status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserFriend {
  @PrimaryGeneratedColumn('uuid')
  userFriendId: string;

  @Column({ name: 'user_id' })
  userId: string;
  @Column({ name: 'friend_id' })
  friendId: string;
  @Column({ name: 'status', default: UserFriendStatus.PENDING })
  status: UserFriendStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'friend_id' })
  friend: User;
}
