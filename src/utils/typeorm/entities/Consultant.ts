import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Intervention } from './Intervention';
import { Ticket } from './Ticket';

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

  @OneToMany(() => Intervention, (intervention) => intervention.consultant, {
    cascade: true,
  })
  @JoinColumn()
  interventions: Intervention[];

  @ManyToMany(() => Ticket)
  @JoinColumn()
  tickets: Ticket[];
}
