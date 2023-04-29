import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Consultant } from './Consultant';
import { Client } from './Client';

export enum TicketStatus {
  OPEN = 'open',
  INPROGRESS = 'in progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}
@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn({ name: 'ticket_id' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: null })
  feedback: string;

  @Column({ default: null })
  solution: string | null;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @ManyToOne(() => Client, (client) => client.tickets)
  client: Client;

  @ManyToOne(() => Consultant, (consultant) => consultant.tickets)
  consultant: Consultant;
}
