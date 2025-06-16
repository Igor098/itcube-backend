import { GroupStudent } from '@/group_students/entities/group_student.entity';
import { Program } from '@/programs/entities/program.entity';
import { ScheduleSession } from '@/schedule_sessions/entities/schedule_session.entity';
import { SchoolYear } from '@/school_years/entities/school_year.entity';
import { TeacherDetail } from '@/teacher_details/entities/teacher_detail.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Index('idx_group_name', { unique: true })
  name: string;

  @Column({
    type: 'boolean',
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @ManyToOne(() => Program, (program) => program.groups, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @ManyToOne(() => SchoolYear, (schoolYear) => schoolYear.groups, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'school_year_id' })
  schoolYear: SchoolYear;

  @ManyToOne(() => TeacherDetail, (teacherDetail) => teacherDetail.groups, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'teacher_id' })
  @Index('idx_group_teacher_id')
  teacher: TeacherDetail;

  @OneToMany(() => GroupStudent, (groupStudent) => groupStudent.group)
  groupStudents: GroupStudent[];

  @OneToMany(() => ScheduleSession, (scheduleSession) => scheduleSession.group)
  scheduleSessions?: ScheduleSession[];

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
