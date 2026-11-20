import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { ProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}
  @Public() @Get()
  @ApiOperation({ summary: 'List projects ordered by position', description: 'Optionally filters projects by the category query string. Returns a JSON array of project objects.' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Project category filter.' })
  @ApiResponse({ status: 200, description: 'JSON array of projects, each containing title, description, tags, category, link, image, features, featured, and position fields.' })
  findAll(@Query('category') category?: string) { return this.projects.findAll(category); }
  @Post() @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a project', description: 'Accepts a JSON ProjectDto with title, description, tags, category, link, features, featured, position, and an optional image.' })
  @ApiResponse({ status: 201, description: 'JSON object containing the newly created project and its generated identifier.' })
  create(@Body() dto: ProjectDto) { return this.projects.create(dto); }
  @Patch(':id') @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a project', description: 'Accepts a project identifier in the URL and a JSON object containing any subset of ProjectDto fields.' })
  @ApiParam({ name: 'id', type: String, description: 'Project identifier.' })
  @ApiResponse({ status: 200, description: 'JSON object containing the updated project.' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) { return this.projects.update(id, dto); }
  @Delete(':id') @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a project', description: 'Accepts a project identifier in the URL and returns a deletion confirmation.' })
  @ApiParam({ name: 'id', type: String, description: 'Project identifier.' })
  @ApiResponse({ status: 200, description: 'JSON object confirming deletion, typically containing the deleted project identifier.' })
  remove(@Param('id') id: string) { return this.projects.remove(id); }
}
