import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileResource } from 'src/common/enums/file-resource.enum';
import { editFileName, upload } from 'src/common/utils/google-storage.util';
import { Repository } from 'typeorm';
import { UploadFileDto } from '../dto/file.dto';
import { File } from '../entities/file.entity';

//   const convertToDto = (entity: Farmer) =>
//     plainToClass(FarmerDto, entity, { excludeExtraneousValues: true });
//   const convertToDtos = (entities: Farmer[]) =>
//     plainToClass(FarmerDto, entities, { excludeExtraneousValues: true });

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async uploadFile(dto: UploadFileDto, file: Express.Multer.File) {
    const { resource, resourceId } = dto;
    const { buffer, originalname, mimetype } = file;
    const fileName = await editFileName(resourceId, file);
    const uri = await upload(`image/${resource.toLowerCase()}`, {
      buffer,
      name: fileName,
    });

    const created = await this.fileRepository.save({
      fileName,
      fileType: mimetype,
      path: uri,
      resource,
      ...(resource == FileResource.EVENT
        ? { eventId: resourceId }
        : { userId: resourceId }),
    });

    return created;
  }
}
