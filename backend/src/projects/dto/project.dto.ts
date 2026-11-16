import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class ProjectDto {
  @ApiProperty({ example: 'Portfolio API' }) @IsString() @MaxLength(150) title!: string;
  @ApiProperty({ example: 'A modern portfolio API.' }) @IsString() @MaxLength(4000) desc!: string;
  @ApiProperty({ example: ['NestJS', 'Prisma'] }) @IsArray() @IsString({ each: true }) tags!: string[];
  @ApiProperty({ enum: Category, example: Category.Web }) @IsEnum(Category) category!: Category;
  @ApiProperty({ example: 'https://example.com/project' }) @IsUrl() link!: string;
  @ApiPropertyOptional({ example: 'project.jpg' }) @IsOptional() @IsString() image?: string;
  @ApiProperty({ example: ['Responsive design'] }) @IsArray() @IsString({ each: true }) features!: string[];
  @ApiProperty({ example: false }) @IsBoolean() featured!: boolean;
  @ApiProperty({ example: 1, minimum: 0 }) @IsInt() @Min(0) position!: number;
}

export class UpdateProjectDto extends PartialType(ProjectDto) {}
