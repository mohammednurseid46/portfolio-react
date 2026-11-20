import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';
@Controller('messages')
@ApiTags('Messages')
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}
  @Get() @ApiOperation({ summary: 'List contact messages', description: 'Accepts a bearer token and no request body. Returns all contact messages as a JSON array.' }) @ApiResponse({ status: 200, description: 'JSON array of messages with id, sender details, message text, read status, and timestamps.' })
  findAll() { return this.messages.findAll(); }
  @Patch(':id') @ApiOperation({ summary: 'Mark a message read or unread', description: 'Accepts a message identifier and a JSON object containing the boolean `isRead` field.' }) @ApiParam({ name: 'id', type: String, description: 'Message identifier.' }) @ApiResponse({ status: 200, description: 'JSON object containing the updated message.' })
  update(@Param('id') id: string, @Body() dto: UpdateMessageDto) { return this.messages.update(id, dto); }
  @Delete(':id') @ApiOperation({ summary: 'Delete a contact message', description: 'Accepts a message identifier and returns a deletion confirmation.' }) @ApiParam({ name: 'id', type: String, description: 'Message identifier.' }) @ApiResponse({ status: 200, description: 'JSON object confirming deletion.' })
  remove(@Param('id') id: string) { return this.messages.remove(id); }
}
