import { Group } from '@/groups/entities/group.entity';
import { Student } from '@/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'group_students' })
@Unique('uq_group_student', ['groupId', 'studentId'])
export class GroupStudent {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'date',
    name: 'enrolment_date',
    nullable: false,
  })
  enrolmentDate: Date;

  @Column({
    type: 'date',
    name: 'graduation_date',
    nullable: true,
  })
  graduationDate?: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  isExpelled: boolean;

  @Column({
    type: 'int',
    name: 'student_id',
    nullable: false,
  })
  @Index('idx_group_student_student_id')
  studentId: number;

  @Column({
    type: 'int',
    name: 'group_id',
    nullable: false,
  })
  @Index('idx_group_student_group_id')
  groupId: number;

  @ManyToOne(() => Student, (student) => student.groupStudents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  @Index('idx_group_student_student')
  student: Student;

  @ManyToOne(() => Group, (group) => group.groupStudents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  @Index('idx_group_student_group')
  group: Group;

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
