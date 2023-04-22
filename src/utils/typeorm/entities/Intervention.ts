import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Consultant } from './Consultant';
import { Client } from './Client';

@Entity({ name: 'interventions' })
export class Intervention {
  @PrimaryGeneratedColumn({ name: 'intervention_id' })
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;

  @ManyToOne(() => Consultant, (consultant) => consultant.interventions)
  consultant: Consultant;
}
