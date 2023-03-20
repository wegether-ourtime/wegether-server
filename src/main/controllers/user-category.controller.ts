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
import { UserCategoryService } from '../services';
import {
  CreateUserCategoryDto,
  QueryUserCategoryDto,
  UpdateUserCategoryDto,
} from '../dto';

@ApiTags('user-category')
@ApiBearerAuth()
@Controller('user-category')
@UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class UserCategoryController {
  constructor(private userCategoryService: UserCategoryService) {}

  @Get('')
  getUserCategorys(@Query() query: QueryUserCategoryDto) {
    return this.userCategoryService.find(query);
  }

  //   @Get('/:id')
  //   getUserCategory(@Param('id') id: string) {
  //     return this.userCategoryService.findOne(id);
  //   }

  // @Post('')
  // createUserCategory(@Body() dto: CreateUserCategoryDto) {
  //   return this.userCategoryService.create(dto);
  // }

  @Post('')
  updateUserCategory(@Body() dto: UpdateUserCategoryDto) {
    return this.userCategoryService.update(dto);
  }

  @Delete('')
  deleteUserCategory(@Param('id') id: string) {
    return this.userCategoryService.delete(id);
  }
}
