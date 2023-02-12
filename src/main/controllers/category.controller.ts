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
import { CategoryService } from '../services';

@ApiTags('category')
// @ApiBearerAuth()
@Controller('category')
// @UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // @Post()
  // createCategory(@Body() dto: CreateUserDeviceDto) {
  //   return this.categoryService.create(dto);
  // }

  // @Delete('')
  // deleteCategory(@Param('token') token: string) {
  //   return this.userDeviceService.delete(token);
  // }
}
