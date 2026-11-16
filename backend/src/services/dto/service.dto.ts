import { IsInt, IsString, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
export class ServiceDto {
  @ApiProperty({ example: 'Web Development' }) @IsString() @MaxLength(150) title!: string;
  @ApiProperty({ example: 'Responsive, high-performance websites.' }) @IsString() @MaxLength(4000) desc!: string;
  @ApiProperty({ example: 'globe' }) @IsString() @MaxLength(100) icon!: string;
  @ApiProperty({ example: 1, minimum: 0 }) @IsInt() @Min(0) position!: number;
}
export class UpdateServiceDto extends PartialType(ServiceDto) {}
