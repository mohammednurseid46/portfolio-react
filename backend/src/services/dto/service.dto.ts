import { IsInt, IsString, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
export class ServiceDto {
  @ApiProperty({ description: 'Service name.', example: 'Web Development', type: String }) @IsString() @MaxLength(150) title!: string;
  @ApiProperty({ description: 'Service description.', example: 'Responsive, high-performance websites.', type: String }) @IsString() @MaxLength(4000) desc!: string;
  @ApiProperty({ description: 'Icon identifier used by the frontend.', example: 'globe', type: String }) @IsString() @MaxLength(100) icon!: string;
  @ApiProperty({ description: 'Display order, starting at zero.', example: 1, minimum: 0, type: Number }) @IsInt() @Min(0) position!: number;
}
export class UpdateServiceDto extends PartialType(ServiceDto) {}
