import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  async create(dto: ContactDto, ip: string) {
    const ipHash = this.hash(ip);
    const saved = await this.prisma.message.create({ data: { ...dto, ipHash } });
    void this.mail.sendContactMessage(dto).catch((error: unknown) => {
      console.error('Contact email failed:', error instanceof Error ? error.message : 'unknown error');
    });
    return { id: saved.id, message: 'Your message was sent successfully' };
  }

  private hash(value: string) {
    return createHash('sha256')
      .update(`${this.config.get<string>('security.hashSalt') || 'portfolio-development-salt'}:${value}`)
      .digest('hex');
  }
}
