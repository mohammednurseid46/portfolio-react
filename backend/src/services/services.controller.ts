import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { ServiceDto, UpdateServiceDto } from './dto/service.dto';
import { ServicesService } from './services.service';
@Controller('services')
@ApiTags('Services')
export class ServicesController {
  constructor(private readonly services: ServicesService) {}
  @Public() @Get()
  @ApiOperation({ summary: 'List services ordered by position' })
  @ApiResponse({ status: 200, description: 'Public service list.' })
  findAll() { return this.services.findAll(); }
  @Post() @ApiBearerAuth() @ApiOperation({ summary: 'Create a service' }) @ApiResponse({ status: 201, description: 'Service created.' })
  create(@Body() dto: ServiceDto) { return this.services.create(dto); }
  @Patch(':id') @ApiBearerAuth() @ApiOperation({ summary: 'Update a service' }) @ApiResponse({ status: 200, description: 'Service updated.' })
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) { return this.services.update(id, dto); }
  @Delete(':id') @ApiBearerAuth() @ApiOperation({ summary: 'Delete a service' }) @ApiResponse({ status: 200, description: 'Service deleted.' })
  remove(@Param('id') id: string) { return this.services.remove(id); }
}
