import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from '../dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  // @Get('')
  // getUsers(@Query() query: QueryUserDto) {
  //   return this.userService.find(query);
  // }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // @Post('')
  // createUser(@Body() dto: CreateUserDto) {
  //   return this.userService.create(dto);
  // }

  @Post('/:id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete('')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
