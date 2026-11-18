import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional() @IsString() @MaxLength(100) @ApiPropertyOptional()
  username?: string;
  @IsOptional() @IsString() @MaxLength(100) @ApiPropertyOptional()
  name?: string;
  @IsOptional() @IsEmail() @MaxLength(255) @ApiPropertyOptional()
  email?: string;
  @IsOptional() @IsString() @MaxLength(50) @ApiPropertyOptional()
  phone?: string;
  @IsOptional() @IsString() @MaxLength(160) @ApiPropertyOptional()
  tagline?: string;
  @IsOptional() @IsString() @MaxLength(1000) @ApiPropertyOptional()
  intro?: string;
  @IsOptional() @IsUrl() @MaxLength(255) @ApiPropertyOptional()
  linkedin?: string;
  @IsOptional() @IsUrl() @MaxLength(255) @ApiPropertyOptional()
  github?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) @ApiPropertyOptional({ type: [String] })
  roles?: string[];
  @IsOptional() @IsString() @ApiPropertyOptional({ writeOnly: true })
  currentPassword?: string;
  @IsOptional() @IsString() @MinLength(8) @MaxLength(200) @ApiPropertyOptional({ writeOnly: true })
  newPassword?: string;
}
