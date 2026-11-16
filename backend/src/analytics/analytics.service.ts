import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { createHash } from 'crypto';
import { ViewDto } from './dto/view.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}
  async record(dto: ViewDto, ip: string) {
    await this.prisma.pageView.create({ data: { ...dto, visitorHash: this.hash(ip) } });
    return { recorded: true };
  }
  async publicStats() {
    const [total, unique] = await Promise.all([
      this.prisma.pageView.count(),
      this.prisma.pageView.findMany({ distinct: ['visitorHash'], select: { visitorHash: true } }),
    ]);
    return { totalViews: total, uniqueVisitors: unique.length };
  }
  async summary() {
    const since = new Date();
    since.setDate(since.getDate() - 29);
    const views = await this.prisma.pageView.findMany({
      where: { createdAt: { gte: since } },
      select: { path: true, visitorHash: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });
    const perDay = new Map<string, number>();
    for (const view of views) {
      const day = view.createdAt.toISOString().slice(0, 10);
      perDay.set(day, (perDay.get(day) || 0) + 1);
    }
    const paths = new Map<string, number>();
    for (const view of views) paths.set(view.path, (paths.get(view.path) || 0) + 1);
    return {
      viewsPerDay: [...perDay].map(([date, count]) => ({ date, count })),
      uniqueVisitors: new Set(views.map((view) => view.visitorHash)).size,
      topPaths: [...paths].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([path, count]) => ({ path, count })),
    };
  }
  private hash(value: string) {
    return createHash('sha256')
      .update(`${this.config.get<string>('security.hashSalt') || 'portfolio-development-salt'}:${value}`)
      .digest('hex');
  }
}
