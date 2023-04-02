import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { FileResource } from 'src/common/enums/file-resource.enum';
import { DeleteFileDto, FileDto, UploadFileDto } from '../dto/file.dto';
import { FileService } from '../services/file.service';

export const fileApiBodyOptions = {
  schema: {
    type: 'object',
    required: ['resourceId', 'file'],
    properties: {
      id: { type: 'string' },
      resourceId: { type: 'string' },
      resource: { type: 'string', enum: Object.values(FileResource) },
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class FileController {
  constructor(private fileService: FileService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileApiBodyOptions)
  async uploadFile(
    @Body() dto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadFile(dto, file);
  }
}
