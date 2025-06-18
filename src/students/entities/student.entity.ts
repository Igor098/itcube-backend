import { AttendanceRecord } from '@/attendance_records/entities/attendance_record.entity';
import { GroupStudent } from '@/group_students/entities/group_student.entity';
import { User } from '@/users/entities/user.entity';
import { differenceInYears } from 'date-fns';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'full_name',
    length: 50,
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'date',
    name: 'birth_date',
    nullable: true,
  })
  birthDate: Date;

  @OneToMany(() => GroupStudent, (groupStudent) => groupStudent.student)
  groupStudents: GroupStudent[];
  @OneToMany(
    () => AttendanceRecord,
    (attendanceRecord) => attendanceRecord.student,
  )
  attendanceRecords?: AttendanceRecord[];

  @Column({
    type: 'int',
    name: 'user_id',
    nullable: true,
  })
  @Index('idx_student_user_id', { unique: true })
  userId?: number;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  @Index('idx_student_user', { unique: true })
  user?: User;

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

  public get age(): number {
    if (!Boolean(this.birthDate)) {
      throw new Error('Отсутствует дата рождения');
    }
    return differenceInYears(new Date(), new Date(this.birthDate));
  }
}
