import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Consultant } from './Consultant';
import { Client } from './Client';

@Entity({ name: 'interventions' })
export class Intervention {
  @PrimaryGeneratedColumn({ name: 'intervention_id' })
  interventionId: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @ManyToOne(() => Consultant)
  consultant: Consultant;

  @ManyToOne(() => Client)
  client: Client;
}
