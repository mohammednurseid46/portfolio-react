import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateMessageDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isRead!: boolean;
}
