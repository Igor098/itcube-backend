import { ScheduleSession } from '@/schedule_sessions/entities/schedule_session.entity';
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

export enum AttendanceStatus {
  PRESENT = 'присутствовал',
  ABSENT = 'отсутствовал',
  LATE = 'опоздал',
  NOT_SET = 'не задано',
}

@Entity({ name: 'attendance_records' })
@Unique('uq_attendance_record', ['studentId', 'sessionId'])
export class AttendanceRecord {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.NOT_SET,
    nullable: false,
  })
  status: AttendanceStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  comment?: string;

  @Column({
    type: 'int',
    name: 'student_id',
    nullable: false,
  })
  @Index('idx_attendance_student_id')
  studentId: number;

  @Column({
    type: 'int',
    name: 'session_id',
    nullable: false,
  })
  @Index('idx_attendance_session_id')
  sessionId: number;

  @ManyToOne(() => Student, (student) => student.attendanceRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  @Index('idx_attendance_student')
  student: Student;

  @ManyToOne(() => ScheduleSession, (session) => session.attendanceRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'session_id' })
  @Index('idx_attendance_session')
  session: ScheduleSession;

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
