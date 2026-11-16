import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll(category?: string) {
    return this.prisma.project.findMany({
      where: category ? { category: category as any } : undefined,
      orderBy: { position: 'asc' },
    });
  }
  create(dto: ProjectDto) { return this.prisma.project.create({ data: dto }); }
  update(id: string, dto: UpdateProjectDto) {
    return this.prisma.project.update({ where: { id }, data: dto }).catch(() => {
      throw new NotFoundException('Project not found');
    });
  }
  remove(id: string) {
    return this.prisma.project.delete({ where: { id } }).catch(() => {
      throw new NotFoundException('Project not found');
    });
  }
}
