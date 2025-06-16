import { AttendanceRecord } from '@/attendance_records/entities/attendance_record.entity';
import { Classroom } from '@/classrooms/entities/classroom.entity';
import { Group } from '@/groups/entities/group.entity';
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

@Entity({ name: 'schedule_sessions' })
export class ScheduleSession {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: false,
  })
  topic: string;

  @Column({
    type: 'date',
    nullable: false,
    name: 'lesson_date',
  })
  @Index('idx_schedule_lesson_date')
  lessonDate: Date;

  @Column({
    type: 'time',
    nullable: false,
    name: 'start_time',
  })
  startTime: string;

  @Column({
    type: 'time',
    nullable: false,
    name: 'end_time',
  })
  endTime: string;

  @Column({
    type: 'int',
    name: 'group_id',
    nullable: false,
  })
  @Index('idx_schedule_group_id')
  groupId: number;

  @ManyToOne(() => Group, (group) => group.scheduleSessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  @Index('idx_schedule_group')
  group: Group;

  @ManyToOne(() => Classroom, (classroom) => classroom.scheduleSessions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @OneToMany(
    () => AttendanceRecord,
    (attendanceRecord) => attendanceRecord.session,
  )
  attendanceRecords: AttendanceRecord[];

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
