import { IsInt, IsString, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
export class SkillDto {
  @ApiProperty({ description: 'Skill name.', example: 'TypeScript', type: String }) @IsString() @MaxLength(150) title!: string;
  @ApiProperty({ description: 'Skill description.', example: 'Typed JavaScript for scalable applications.', type: String }) @IsString() @MaxLength(1000) desc!: string;
  @ApiProperty({ description: 'Icon identifier used by the frontend.', example: 'typescript', type: String }) @IsString() @MaxLength(100) icon!: string;
  @ApiProperty({ description: 'Display order, starting at zero.', example: 1, minimum: 0, type: Number }) @IsInt() @Min(0) position!: number;
}
export class UpdateSkillDto extends PartialType(SkillDto) {}
