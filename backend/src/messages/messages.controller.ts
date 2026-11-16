import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';
@Controller('messages')
@ApiTags('Messages')
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}
  @Get() @ApiOperation({ summary: 'List contact messages' }) @ApiResponse({ status: 200, description: 'Contact messages.' })
  findAll() { return this.messages.findAll(); }
  @Patch(':id') @ApiOperation({ summary: 'Mark a message read or unread' }) @ApiResponse({ status: 200, description: 'Message updated.' })
  update(@Param('id') id: string, @Body() dto: UpdateMessageDto) { return this.messages.update(id, dto); }
  @Delete(':id') @ApiOperation({ summary: 'Delete a contact message' }) @ApiResponse({ status: 200, description: 'Message deleted.' })
  remove(@Param('id') id: string) { return this.messages.remove(id); }
}
