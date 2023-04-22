import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Intervention } from './Intervention';

@Entity({ name: 'consultants' })
export class Consultant {
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
    default: 'consultant',
  })
  role: string;

  @OneToMany(() => Intervention, (intervention) => intervention.consultant)
  @JoinColumn()
  interventions: Intervention[];
}
