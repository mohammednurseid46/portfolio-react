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
  @ApiOperation({ summary: 'Send a contact message', description: 'Accepts a JSON object with the sender name, email address, and message text. The client IP is captured by the server.' })
  @ApiResponse({ status: 201, description: 'JSON confirmation containing the created contact message result.' })
  @ApiResponse({ status: 400, description: 'Invalid contact data.' })
  @ApiResponse({ status: 429, description: 'Contact rate limit exceeded.' })
  create(@Body() dto: ContactDto, @Req() request: Request) {
    return this.contact.create(dto, request.ip || 'unknown');
  }
}
