import { Expose } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/app/query';

export class ChatDto {
  @Expose()
  chatId: string;

  @Expose()
  senderId: string;
  @Expose()
  receiverId: string;
  @Expose()
  userFriendId: string;
  @Expose()
  eventId: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class CreateChatDto extends OmitType(ChatDto, [
  'chatId',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateChatDto extends PartialType(CreateChatDto) {
  @Expose()
  @ApiProperty({ required: true })
  chatId: string;
}
