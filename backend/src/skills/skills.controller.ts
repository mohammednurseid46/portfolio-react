import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { SkillDto, UpdateSkillDto } from './dto/skill.dto';
import { SkillsService } from './skills.service';
@Controller('skills')
@ApiTags('Skills')
export class SkillsController {
  constructor(private readonly skills: SkillsService) {}
  @Public() @Get()
  @ApiOperation({ summary: 'List skills ordered by position', description: 'Returns a JSON array of public skill objects.' })
  @ApiResponse({ status: 200, description: 'JSON array of skills with title, description, icon, and position fields.' })
  findAll() { return this.skills.findAll(); }
  @Post() @ApiBearerAuth() @ApiOperation({ summary: 'Create a skill', description: 'Accepts a JSON SkillDto containing title, description, icon, and position.' }) @ApiResponse({ status: 201, description: 'JSON object containing the created skill and its identifier.' })
  create(@Body() dto: SkillDto) { return this.skills.create(dto); }
  @Patch(':id') @ApiBearerAuth() @ApiOperation({ summary: 'Update a skill', description: 'Accepts a skill identifier and a JSON object containing any subset of SkillDto fields.' }) @ApiParam({ name: 'id', type: String, description: 'Skill identifier.' }) @ApiResponse({ status: 200, description: 'JSON object containing the updated skill.' })
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto) { return this.skills.update(id, dto); }
  @Delete(':id') @ApiBearerAuth() @ApiOperation({ summary: 'Delete a skill', description: 'Accepts a skill identifier and returns a deletion confirmation.' }) @ApiParam({ name: 'id', type: String, description: 'Skill identifier.' }) @ApiResponse({ status: 200, description: 'JSON object confirming deletion.' })
  remove(@Param('id') id: string) { return this.skills.remove(id); }
}
