import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthMethod, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        userRoles: {
          role: true,
        },
        accounts: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        userRoles: {
          role: true,
        },
        accounts: true,
      },
    });
    return user;
  }

  public async create(
    email: string,
    password: string,
    username: string,
    picture: string,
    method: AuthMethod,
    isVerified: boolean,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password ? await hash(password) : '';
    user.username = username;
    user.picture = picture;
    user.method = method;
    user.isVerified = isVerified;

    await this.userRepository.save(user);

    return await this.findById(user.id);
  }
}
