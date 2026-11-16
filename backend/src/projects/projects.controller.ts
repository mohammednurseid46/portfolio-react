import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { ProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}
  @Public() @Get()
  @ApiOperation({ summary: 'List projects ordered by position' })
  @ApiResponse({ status: 200, description: 'Public project list.' })
  findAll(@Query('category') category?: string) { return this.projects.findAll(category); }
  @Post() @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({ status: 201, description: 'Project created.' })
  create(@Body() dto: ProjectDto) { return this.projects.create(dto); }
  @Patch(':id') @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200, description: 'Project updated.' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) { return this.projects.update(id, dto); }
  @Delete(':id') @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 200, description: 'Project deleted.' })
  remove(@Param('id') id: string) { return this.projects.remove(id); }
}
