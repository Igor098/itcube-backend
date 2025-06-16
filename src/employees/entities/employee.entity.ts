import { Position } from '@/positions/entities/position.entity';
import { TeacherDetail } from '@/teacher_details/entities/teacher_detail.entity';
import { User } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'full_name',
    length: 100,
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'date',
    name: 'birth_date',
    nullable: true,
  })
  birthDate: Date;

  @Column({
    type: 'int',
    nullable: true,
    name: 'position_id',
  })
  @Index('idx_employee_position_id')
  positionId: number;

  @ManyToOne(() => Position, (position) => position.employees, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'position_id' })
  @Index('idx_employee_position')
  position: Position;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  education?: string;

  @Column({
    type: 'date',
    name: 'hire_date',
    nullable: false,
  })
  hireDate: Date;

  @Column({
    type: 'int',
    name: 'user_id',
    nullable: false,
  })
  @Index('idx_employee_user_id')
  userId: number;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn({ name: 'user_id' })
  @Index('idx_employee_user', { unique: true })
  user: User;

  @OneToOne(() => TeacherDetail, (teacherDetail) => teacherDetail.employee)
  teacherDetail?: TeacherDetail;

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
