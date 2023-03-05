import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FileResource } from 'src/common/enums/file-resource.enum';

export class FileDto {
  @Expose()
  @ApiProperty({ required: false })
  public id: string;
  @Expose()
  @ApiProperty({ required: false })
  public fileName: string;
  @Expose()
  @ApiProperty({ required: false })
  public fileType: string;
  @Expose()
  @ApiProperty({ enum: FileResource, required: false })
  public resource: string;
  @Expose()
  @ApiProperty({ required: false })
  public path: string;
}

export class QueryFileDto {
  @Expose()
  @ApiProperty({ required: true })
  public path: string;
}

export class UploadFileDto {
  @Expose()
  public fileName: string;
  @Expose()
  public fileType: string;
  @Expose()
  @ApiProperty({ enum: FileResource, required: true })
  public resource: FileResource;
  @Expose()
  @ApiProperty({ required: true })
  public resourceId: string;
}

export class DeleteFileDto {
  @Expose()
  @ApiProperty({ required: true })
  public id: string;
  @Expose()
  @ApiProperty({ required: true })
  public path: string;
}
