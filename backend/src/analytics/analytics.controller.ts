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
  @ApiOperation({ summary: 'Record an anonymous page view', description: 'Accepts a JSON path and optional referrer URL. The server derives the visitor identity from the client IP without returning private visitor data.' })
  @ApiResponse({ status: 201, description: 'JSON confirmation that the view was recorded.' })
  record(@Body() dto: ViewDto, @Req() request: Request) { return this.analytics.record(dto, request.ip || 'unknown'); }
  @Public() @Get('public')
  @ApiOperation({ summary: 'Get public view totals', description: 'Requires no request body or authentication and returns aggregate public analytics as JSON.' })
  @ApiResponse({ status: 200, description: 'JSON object containing numeric total views and unique visitor counts.' })
  publicStats() { return this.analytics.publicStats(); }
  @Get('summary') @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the administrator analytics summary', description: 'Accepts a bearer token and no request body. Returns detailed analytics aggregates as JSON.' })
  @ApiResponse({ status: 200, description: 'JSON object containing views per day, unique visitors, and top paths.' })
  summary() { return this.analytics.summary(); }
}
