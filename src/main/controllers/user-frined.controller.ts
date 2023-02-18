// import {
//   ClassSerializerInterceptor,
//   Controller,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/auth.guard';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// @ApiTags('user-friend')
// @ApiBearerAuth()
// @Controller('user-friend')
// @UseGuards(JwtAuthGuard)
// //@UsePipes(SanitizePipe)
// @UseInterceptors(ClassSerializerInterceptor)
// export class UserFriendController {
//   constructor(private userFriendService: UserFriendService) {}
// }
