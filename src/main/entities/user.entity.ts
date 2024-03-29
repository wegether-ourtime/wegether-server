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

  @Column({ name: 'bio', nullable: true })
  bio: string;
  @Column({ name: 'gender', nullable: true })
  gender: string;
  @Column({ name: 'location', nullable: true, type: 'jsonb' })
  livingPlace: string;

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

  @AfterLoad()
  getImgProfile() {
    this.imgProfileUrl = this.files?.find(
      (f) => f.resource === FileResource.USER_PROFILE,
    )?.path;
  }
  @AfterLoad()
  getImgCover() {
    this.imgCoverUrl = this.files?.find(
      (f) => f.resource === FileResource.USER_COVER,
    )?.path;
  }
}
