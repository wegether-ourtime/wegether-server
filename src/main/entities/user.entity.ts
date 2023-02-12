import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  
  @Column({ name: ' email' })
  email: string;
  @Column({ name: ' password' })
  password: string;
  @Column({ name: ' full_name' })
  fullName: string;

  @Column({ name: ' id_no' })
  idNo: string
  @Column({ name: ' tel_no' })
  telNo: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
