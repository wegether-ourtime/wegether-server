import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SanitizePipe implements PipeTransform {
  constructor() {}

  transform(value: any, metadata: ArgumentMetadata) {
    return plainToClass(metadata.metatype, value, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}