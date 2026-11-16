import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ContactDto {
  @ApiProperty({ example: 'Jane Doe', minLength: 2, maxLength: 80 })
  @IsString() @Length(2, 80) name!: string;
  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail() @MaxLength(320) email!: string;
  @ApiProperty({ example: 'I would like to discuss a project.', minLength: 10, maxLength: 2000 })
  @IsString() @Length(10, 2000) message!: string;
}
