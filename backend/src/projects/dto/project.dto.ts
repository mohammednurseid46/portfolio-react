import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class ProjectDto {
  @ApiProperty({ description: 'Project title.', example: 'Portfolio API', type: String }) @IsString() @MaxLength(150) title!: string;
  @ApiProperty({ description: 'Project description.', example: 'A modern portfolio API.', type: String }) @IsString() @MaxLength(4000) desc!: string;
  @ApiProperty({ description: 'Technology or topic tags.', example: ['NestJS', 'Prisma'], type: [String] }) @IsArray() @IsString({ each: true }) tags!: string[];
  @ApiProperty({ description: 'Project category.', enum: Category, example: Category.Web }) @IsEnum(Category) category!: Category;
  @ApiProperty({ description: 'Public project URL.', example: 'https://example.com/project', type: String }) @IsUrl() link!: string;
  @ApiPropertyOptional({ description: 'Optional image URL or filename.', example: 'project.jpg', type: String }) @IsOptional() @IsString() image?: string;
  @ApiProperty({ description: 'List of project features.', example: ['Responsive design'], type: [String] }) @IsArray() @IsString({ each: true }) features!: string[];
  @ApiProperty({ description: 'Whether the project is featured.', example: false, type: Boolean }) @IsBoolean() featured!: boolean;
  @ApiProperty({ description: 'Display order, starting at zero.', example: 1, minimum: 0, type: Number }) @IsInt() @Min(0) position!: number;
}

export class UpdateProjectDto extends PartialType(ProjectDto) {}
