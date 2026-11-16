import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceDto, UpdateServiceDto } from './dto/service.dto';
@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.service.findMany({ orderBy: { position: 'asc' } }); }
  create(dto: ServiceDto) { return this.prisma.service.create({ data: dto }); }
  update(id: string, dto: UpdateServiceDto) { return this.prisma.service.update({ where: { id }, data: dto }).catch(() => { throw new NotFoundException('Service not found'); }); }
  remove(id: string) { return this.prisma.service.delete({ where: { id } }).catch(() => { throw new NotFoundException('Service not found'); }); }
}
