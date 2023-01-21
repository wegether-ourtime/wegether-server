import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class ChatDto {
  @Expose()
  chatId: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateChatDto extends OmitType(ChatDto, [
  'chatId',
  'createdAt',
  'updatedAt',
]) {
  @Expose()
  @ApiProperty({ required: true })
  chatId: string;
}

export class UpdateChatDto extends PartialType(CreateChatDto) {
  @Expose()
  @ApiProperty({ required: true })
  chatId: string;
}

export class QueryChatDto extends QueryDto {}
