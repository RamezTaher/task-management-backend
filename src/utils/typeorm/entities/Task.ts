import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ticket } from './Ticket';

export enum TaskStatus {
  TODO = 'to do',
  INPROGRESS = 'in progress',
  DONE = 'done',
}

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

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ManyToOne(() => Ticket, (ticket) => ticket.tasks)
  ticket: Ticket;
}
