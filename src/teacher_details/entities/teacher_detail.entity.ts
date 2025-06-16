import { Employee } from '@/employees/entities/employee.entity';
import { Group } from '@/groups/entities/group.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'teacher_details' })
export class TeacherDetail {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  specialization: string;

  @Column({
    type: 'int',
    name: 'employee_id',
    nullable: false,
  })
  @Index('idx_teacher_detail_employee_id')
  employeeId: number;

  @OneToOne(() => Employee, (employee) => employee.teacherDetail, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  @Index('idx_teacher_detail_employee', { unique: true })
  employee: Employee;

  @OneToMany(() => Group, (group) => group.teacher)
  groups: Group[];
}
