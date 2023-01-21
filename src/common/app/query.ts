import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class QueryDto {
  @Expose()
  @ApiProperty({ required: false })
  page: number;
  @Expose()
  @ApiProperty({ required: false })
  take: number;
  @Expose()
  @ApiProperty({ required: false })
  sortField: string;
  @Expose()
  @ApiProperty({ enum: SortDirection, required: false })
  sortDirection: SortDirection;
  @Expose()
  @ApiProperty({ required: false })
  search: string;
}
