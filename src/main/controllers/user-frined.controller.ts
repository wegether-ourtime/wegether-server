import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserFriendService } from '../services/user-friend.service';
import {
  CreateUserFriendDto,
  QueryUserFriendDto,
  UpdateUserFriendDto,
} from '../dto';

@ApiTags('user-friend')
@ApiBearerAuth()
@Controller('user-friend')
@UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class UserFriendController {
  constructor(private userFriendService: UserFriendService) {}

  @Get('')
  getUserFriends(@Query() query: QueryUserFriendDto) {
    return this.userFriendService.find(query);
  }

  //   @Get('/:id')
  //   getUserFriend(@Param('id') id: string) {
  //     return this.userFriendService.findOne(id);
  //   }

  @Get('/get-friend-request/:id')
  getFriendRequest(@Param('id') userId: string) {
    return this.userFriendService.findFriendRequest(userId);
  }

  @Get('/get-relations')
  getRelations(@Query() query: QueryUserFriendDto) {
    return this.userFriendService.findRelations(query);
  }

  @Post('')
  createUserFriend(@Body() dto: CreateUserFriendDto) {
    return this.userFriendService.create(dto);
  }

  @Patch('/:id')
  updateUserFriend(@Param('id') id: string, @Body() dto: UpdateUserFriendDto) {
    return this.userFriendService.update(id, dto);
  }

  @Delete('/:id')
  deleteUserFriend(@Param('id') id: string) {
    return this.userFriendService.delete(id);
  }
}
