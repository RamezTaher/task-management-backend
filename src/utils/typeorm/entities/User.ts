import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  CONSULTANT = 'consultant',
}

@Entity({ name: 'users' })
export class User {
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
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;
}
