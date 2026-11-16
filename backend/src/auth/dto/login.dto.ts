import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'admin' })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty({ example: 'your-admin-password', writeOnly: true })
  password!: string;
}
