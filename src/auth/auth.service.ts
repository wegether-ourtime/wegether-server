import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, hashPassword } from 'src/common/utils/password.util';
import { User } from 'src/main/entities';
import { Repository } from 'typeorm';
import { LoginAuthDto, RegisterAuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginAuthDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user && comparePassword(password, user.password)) {
      const payload = {
        userId: user.userId,
        telNo: user.telNo,
      };

      return {
        accessToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
        user,
      };
    }

    throw new BadRequestException(
      'Please check your verify payload and try again later.',
    );
  }

  async register(dto: RegisterAuthDto) {
    const { password } = dto;
    const user = await this.userRepository.save({
      ...dto,
      password: await hashPassword(password),
    });
    const payload = {
      userId: user.userId,
      telNo: user.telNo,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
      user,
    };
  }
}
