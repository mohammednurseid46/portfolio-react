import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ViewDto {
  @ApiProperty({ description: 'Page path viewed by the visitor.', example: '/projects', type: String })
  @IsString() @MinLength(1) @MaxLength(500) path!: string;
  @ApiPropertyOptional({ description: 'Optional referring page URL.', example: 'https://google.com', type: String })
  @IsOptional() @IsUrl({ require_tld: false }) @MaxLength(2000) referrer?: string;
}
