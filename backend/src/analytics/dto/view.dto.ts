import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ViewDto {
  @ApiProperty({ example: '/projects' })
  @IsString() @MinLength(1) @MaxLength(500) path!: string;
  @ApiPropertyOptional({ example: 'https://google.com' })
  @IsOptional() @IsUrl({ require_tld: false }) @MaxLength(2000) referrer?: string;
}
