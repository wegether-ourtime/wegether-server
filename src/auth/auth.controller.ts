import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/main/services';
import { CreateUserDto } from 'src/main/dto';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() dto: LoginAuthDto) {
    return await this.authService.login(dto);
  }

  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    console.log(dto)
    return await this.authService.register(dto);
  }
}
