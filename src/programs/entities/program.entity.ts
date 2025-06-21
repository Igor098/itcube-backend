import { Group } from '@/groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'programs' })
export class Program {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  @Index('idx_program_name', { unique: true })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'int',
    name: 'duration_hours',
    nullable: false,
  })
  durationHours: number;

  @Column({
    type: 'int',
    name: 'min_age',
    nullable: false,
    default: 0,
  })
  minAge: number;

  @Column({
    type: 'int',
    name: 'max_age',
    nullable: false,
    default: 0,
  })
  maxAge: number;

  @Column({
    type: 'boolean',
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Group, (group) => group.program)
  groups: Group[];

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
