import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { ServiceDto, UpdateServiceDto } from './dto/service.dto';
import { ServicesService } from './services.service';
@Controller('services')
@ApiTags('Services')
export class ServicesController {
  constructor(private readonly services: ServicesService) {}
  @Public() @Get()
  @ApiOperation({ summary: 'List services ordered by position', description: 'Returns a JSON array of public service objects.' })
  @ApiResponse({ status: 200, description: 'JSON array of services with title, description, icon, and position fields.' })
  findAll() { return this.services.findAll(); }
  @Post() @ApiBearerAuth() @ApiOperation({ summary: 'Create a service', description: 'Accepts a JSON ServiceDto containing title, description, icon, and position.' }) @ApiResponse({ status: 201, description: 'JSON object containing the created service and its identifier.' })
  create(@Body() dto: ServiceDto) { return this.services.create(dto); }
  @Patch(':id') @ApiBearerAuth() @ApiOperation({ summary: 'Update a service', description: 'Accepts a service identifier and a JSON object containing any subset of ServiceDto fields.' }) @ApiParam({ name: 'id', type: String, description: 'Service identifier.' }) @ApiResponse({ status: 200, description: 'JSON object containing the updated service.' })
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) { return this.services.update(id, dto); }
  @Delete(':id') @ApiBearerAuth() @ApiOperation({ summary: 'Delete a service', description: 'Accepts a service identifier and returns a deletion confirmation.' }) @ApiParam({ name: 'id', type: String, description: 'Service identifier.' }) @ApiResponse({ status: 200, description: 'JSON object confirming deletion.' })
  remove(@Param('id') id: string) { return this.services.remove(id); }
}
