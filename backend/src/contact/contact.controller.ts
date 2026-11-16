import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { ContactDto } from './dto/contact.dto';
import { ContactService } from './contact.service';
import type { Request } from 'express';
@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(private readonly contact: ContactService) {}
  @Public() @Post()
  @ApiOperation({ summary: 'Send a contact message' })
  @ApiResponse({ status: 201, description: 'Message saved and email queued.' })
  @ApiResponse({ status: 400, description: 'Invalid contact data.' })
  @ApiResponse({ status: 429, description: 'Contact rate limit exceeded.' })
  create(@Body() dto: ContactDto, @Req() request: Request) {
    return this.contact.create(dto, request.ip || 'unknown');
  }
}
