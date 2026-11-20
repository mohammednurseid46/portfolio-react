import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateMessageDto {
  @ApiProperty({ description: 'Set true to mark the message as read, or false to mark it unread.', example: true, type: Boolean })
  @IsBoolean()
  isRead!: boolean;
}
