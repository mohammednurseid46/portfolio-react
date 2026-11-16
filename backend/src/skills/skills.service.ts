import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SkillDto, UpdateSkillDto } from './dto/skill.dto';
@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.skill.findMany({ orderBy: { position: 'asc' } }); }
  create(dto: SkillDto) { return this.prisma.skill.create({ data: dto }); }
  update(id: string, dto: UpdateSkillDto) { return this.prisma.skill.update({ where: { id }, data: dto }).catch(() => { throw new NotFoundException('Skill not found'); }); }
  remove(id: string) { return this.prisma.skill.delete({ where: { id } }).catch(() => { throw new NotFoundException('Skill not found'); }); }
}
