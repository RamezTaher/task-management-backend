import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Consultant } from './Consultant';
import { InterventionType } from './InterventionType';

export enum IntevrentionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}
@Entity({ name: 'interventions' })
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: 'none' })
  accepted_by: string;

  @Column({
    type: 'enum',
    enum: IntevrentionStatus,
    default: IntevrentionStatus.PENDING,
  })
  status: IntevrentionStatus;

  @ManyToOne(() => InterventionType)
  @JoinColumn()
  interventionType: InterventionType;

  @ManyToOne(() => Consultant, (consultant) => consultant.interventions)
  consultant: Consultant;
}
