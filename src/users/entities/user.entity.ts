import { VALIDATION } from '@/libs/common/constants/validation';
import { Employee } from '@/employees/entities/employee.entity';
import { Student } from '@/students/entities/student.entity';
import { UserRole } from '@/user_roles/entities/user_role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '@/accounts/entities/account.entity';

export enum AuthMethod {
  CREDENTIALS = 'credentials',
  GOOGLE = 'google',
  YANDEX = 'yandex',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: VALIDATION.EMAIL.LENGTH.MAX,
    nullable: false,
  })
  @Index('idx_user_email', { unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: VALIDATION.PASSWORD.LENGTH.MAX,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: VALIDATION.USERNAME.LENGTH.MAX,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'enum',
    enum: AuthMethod,
    default: AuthMethod.CREDENTIALS,
  })
  method: AuthMethod;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  picture?: string;

  @Column({
    type: 'boolean',
    name: 'is_verified',
    default: false,
  })
  isVerified: boolean;

  @Column({
    type: 'boolean',
    name: 'is_two_factor_enabled',
    default: false,
  })
  isTwoFactorEnabled: boolean;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles?: UserRole[];

  @OneToOne(() => Employee, (employee) => employee.user)
  employee?: Employee;

  @OneToOne(() => Student, (student) => student.user)
  student?: Student;

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
