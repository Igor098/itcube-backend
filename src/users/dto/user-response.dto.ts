export class UserResponseDto {
  id: number;
  email: string;
  username: string;
  method: string;
  isVerified: boolean;
  isTwoFactorEnabled: boolean;
  roles: string[];
}
