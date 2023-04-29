import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from './Ticket';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  endDate: Date;

  @ManyToOne(() => Ticket, (ticket) => ticket.tasks)
  ticket: Ticket;
}
