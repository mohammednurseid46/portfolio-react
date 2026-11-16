import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { SkillDto, UpdateSkillDto } from './dto/skill.dto';
import { SkillsService } from './skills.service';
@Controller('skills')
@ApiTags('Skills')
export class SkillsController {
  constructor(private readonly skills: SkillsService) {}
  @Public() @Get()
  @ApiOperation({ summary: 'List skills ordered by position' })
  @ApiResponse({ status: 200, description: 'Public skill list.' })
  findAll() { return this.skills.findAll(); }
  @Post() @ApiBearerAuth() @ApiOperation({ summary: 'Create a skill' }) @ApiResponse({ status: 201, description: 'Skill created.' })
  create(@Body() dto: SkillDto) { return this.skills.create(dto); }
  @Patch(':id') @ApiBearerAuth() @ApiOperation({ summary: 'Update a skill' }) @ApiResponse({ status: 200, description: 'Skill updated.' })
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto) { return this.skills.update(id, dto); }
  @Delete(':id') @ApiBearerAuth() @ApiOperation({ summary: 'Delete a skill' }) @ApiResponse({ status: 200, description: 'Skill deleted.' })
  remove(@Param('id') id: string) { return this.skills.remove(id); }
}
