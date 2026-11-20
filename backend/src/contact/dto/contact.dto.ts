import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ContactDto {
  @ApiProperty({ description: 'Sender display name.', example: 'Jane Doe', minLength: 2, maxLength: 80, type: String })
  @IsString() @Length(2, 80) name!: string;
  @ApiProperty({ description: 'Sender email address.', example: 'jane@example.com', type: String })
  @IsEmail() @MaxLength(320) email!: string;
  @ApiProperty({ description: 'Message content.', example: 'I would like to discuss a project.', minLength: 10, maxLength: 2000, type: String })
  @IsString() @Length(10, 2000) message!: string;
}
