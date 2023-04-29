import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Consultant } from './Consultant';
import { Client } from './Client';
import { Task } from './Task';

export enum TicketStatus {
  OPEN = 'open',
  INPROGRESS = 'in progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}
@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn()
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

  @OneToMany(() => Task, (task) => task.ticket)
  @JoinColumn()
  tasks: Task[];
}
