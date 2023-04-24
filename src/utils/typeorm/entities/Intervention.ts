import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Consultant } from './Consultant';

export enum IntevrentionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}
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

  @Column({
    type: 'enum',
    enum: IntevrentionStatus,
    default: IntevrentionStatus.PENDING,
  })
  status: IntevrentionStatus;

  @ManyToOne(() => Consultant, (consultant) => consultant.interventions)
  consultant: Consultant;
}
