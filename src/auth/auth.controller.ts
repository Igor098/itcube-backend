import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '@/users/dto/user-response.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() user: RegisterDto,
  ): Promise<UserResponseDto> {
    return await this.authService.register(req, user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() user: LoginDto,
  ): Promise<UserResponseDto> {
    return await this.authService.login(req, user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return await this.authService.logout(req, res);
  }
}
