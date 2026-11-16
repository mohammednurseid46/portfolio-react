import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { ViewDto } from './dto/view.dto';
import { AnalyticsService } from './analytics.service';
import type { Request } from 'express';
@Controller('analytics')
@ApiTags('Analytics')
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}
  @Public() @Post('view')
  @ApiOperation({ summary: 'Record an anonymous page view' })
  @ApiResponse({ status: 201, description: 'Page view recorded.' })
  record(@Body() dto: ViewDto, @Req() request: Request) { return this.analytics.record(dto, request.ip || 'unknown'); }
  @Public() @Get('public')
  @ApiOperation({ summary: 'Get public view totals' })
  @ApiResponse({ status: 200, description: 'Total views and unique visitors.' })
  publicStats() { return this.analytics.publicStats(); }
  @Get('summary') @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the administrator analytics summary' })
  @ApiResponse({ status: 200, description: 'Views per day, unique visitors, and top paths.' })
  summary() { return this.analytics.summary(); }
}
