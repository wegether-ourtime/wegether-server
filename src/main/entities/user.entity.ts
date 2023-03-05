import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { File } from './file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'password' })
  password: string;
  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'id_no' })
  idNo: string;
  @Column({ name: 'tel_no' })
  telNo: string;

  @Column({ name: 'img_profile_url', nullable: true })
  imgProfileUrl: string;
  @Column({ name: 'img_cover_url', nullable: true })
  imgCoverUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => File, (file) => file.user, {
    cascade: true,
  })
  files: File[];
}
