// import {
//   ClassSerializerInterceptor,
//   Controller,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/auth.guard';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// @ApiTags('user-category')
// @ApiBearerAuth()
// @Controller('user-category')
// @UseGuards(JwtAuthGuard)
// //@UsePipes(SanitizePipe)
// @UseInterceptors(ClassSerializerInterceptor)
// export class UserCategoryController {
//   constructor(private userCategoryService: UserCategoryService) {}
// }
