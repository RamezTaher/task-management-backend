import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  cin: string;

  @Column()
  phone: string;

  @Column()
  date_naissance: Date;

  @Column()
  @Exclude()
  password: string;

  @Column({
    default: 'admin',
  })
  role: string;
}
