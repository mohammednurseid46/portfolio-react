import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator';
import { PrismaService } from './prisma/prisma.service';
@Controller('health')
@ApiTags('Health')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Check API health' })
  @ApiResponse({ status: 200, description: 'API is healthy.' })
  @Public() @Get()
  async health() {
    let database: 'up' | 'down' = 'up';
    try {
      await this.prisma.$queryRawUnsafe('SELECT 1');
    } catch {
      database = 'down';
    }
    return { status: 'ok', database };
  }
}
