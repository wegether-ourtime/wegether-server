import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class QueryPlaceDto {
  @Expose()
  @ApiProperty({ required: true })
  search: string;
  @Expose()
  @ApiProperty({ required: false })
  nextPage: string;
}
