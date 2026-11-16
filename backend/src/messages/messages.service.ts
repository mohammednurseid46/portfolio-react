import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMessageDto } from './dto/update-message.dto';
@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.message.findMany({ orderBy: { createdAt: 'desc' } }); }
  update(id: string, dto: UpdateMessageDto) {
    return this.prisma.message.update({ where: { id }, data: dto }).catch(() => { throw new NotFoundException('Message not found'); });
  }
  remove(id: string) {
    return this.prisma.message.delete({ where: { id } }).catch(() => { throw new NotFoundException('Message not found'); });
  }
}
