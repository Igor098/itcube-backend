import { UsersService } from '@/users/users.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthMethod, User } from '@/users/entities/user.entity';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { mapUserToDto } from '@/users/mappers/user.mapper';
import { UserResponseDto } from '@/users/dto/user-response.dto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  public async register(
    req: Request,
    user: RegisterDto,
  ): Promise<UserResponseDto> {
    const isExists = await this.usersService.findByEmail(user.email);

    if (isExists) {
      throw new ConflictException('Пользователь с таким email уже существует!');
    }
    const newUser = await this.usersService.create(
      user.email,
      user.password,
      user.username,
      '',
      AuthMethod.CREDENTIALS,
      false,
    );

    return await this.saveSession(req, newUser);
  }

  public async login(
    req: Request,
    userDto: LoginDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findByEmail(userDto.email);

    if (!user || !user.password) {
      throw new NotFoundException(
        'Пользователь не найден! Пожалуйста проверьте введенные данные!',
      );
    }

    const isValidPassword = await verify(user.password, userDto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(
        'Неверный пароль! Попробуйте еще раз или восстановите пароль.',
      );
    }

    return await this.saveSession(req, user);
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return await new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (Boolean(err)) {
          return reject(
            new InternalServerErrorException(
              'Не удалось завершить сессию. Возможно возникла проблема с сервером или сессия уже завершена.',
            ),
          );
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
        resolve();
      });
    });
  }

  private async saveSession(
    req: Request,
    newUser: User,
  ): Promise<UserResponseDto> {
    return await new Promise((resolve, reject) => {
      req.session.userId = String(newUser.id);

      req.session.save((err) => {
        if (Boolean(err)) {
          return reject(
            new InternalServerErrorException(
              'Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессий',
            ),
          );
        }

        resolve(mapUserToDto(newUser));
      });
    });
  }
}
