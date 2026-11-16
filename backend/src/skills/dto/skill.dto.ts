import { IsInt, IsString, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
export class SkillDto {
  @ApiProperty({ example: 'TypeScript' }) @IsString() @MaxLength(150) title!: string;
  @ApiProperty({ example: 'Typed JavaScript for scalable applications.' }) @IsString() @MaxLength(1000) desc!: string;
  @ApiProperty({ example: 'typescript' }) @IsString() @MaxLength(100) icon!: string;
  @ApiProperty({ example: 1, minimum: 0 }) @IsInt() @Min(0) position!: number;
}
export class UpdateSkillDto extends PartialType(SkillDto) {}
