import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateUserDto } from 'src/main/dto';

export class LoginAuthDto {
  @Expose()
  @ApiProperty()
  email: string;
  @Expose()
  @ApiProperty()
  password: string;
}

export class RegisterAuthDto extends CreateUserDto {}
