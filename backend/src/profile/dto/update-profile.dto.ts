import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional() @IsString() @MaxLength(100) @ApiPropertyOptional({ description: 'New administrator username.', type: String })
  username?: string;
  @IsOptional() @IsString() @MaxLength(100) @ApiPropertyOptional({ description: 'Public display name.', type: String })
  name?: string;
  @IsOptional() @IsEmail() @MaxLength(255) @ApiPropertyOptional({ description: 'Public contact email.', type: String })
  email?: string;
  @IsOptional() @IsString() @MaxLength(50) @ApiPropertyOptional({ description: 'Public phone number.', type: String })
  phone?: string;
  @IsOptional() @IsString() @MaxLength(160) @ApiPropertyOptional({ description: 'Short public tagline.', type: String })
  tagline?: string;
  @IsOptional() @IsString() @MaxLength(1000) @ApiPropertyOptional({ description: 'Public introduction text.', type: String })
  intro?: string;
  @IsOptional() @IsUrl() @MaxLength(255) @ApiPropertyOptional({ description: 'LinkedIn profile URL.', type: String })
  linkedin?: string;
  @IsOptional() @IsUrl() @MaxLength(255) @ApiPropertyOptional({ description: 'GitHub profile URL.', type: String })
  github?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) @ApiPropertyOptional({ description: 'Public role titles.', type: [String] })
  roles?: string[];
  @IsOptional() @IsString() @ApiPropertyOptional({ description: 'Current password, required when changing the password.', writeOnly: true, type: String })
  currentPassword?: string;
  @IsOptional() @IsString() @MinLength(8) @MaxLength(200) @ApiPropertyOptional({ description: 'New password, at least 8 characters.', writeOnly: true, type: String })
  newPassword?: string;
}
