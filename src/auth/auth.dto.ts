import { Expose } from 'class-transformer';
import { CreateUserDto } from 'src/main/dto';

export class LoginAuthDto {
  @Expose()
  email: string;
  @Expose()
  password: string;
}

export class RegisterAuthDto extends CreateUserDto {}
