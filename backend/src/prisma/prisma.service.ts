import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('Database');

  constructor(private readonly config: ConfigService) {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRawUnsafe('SELECT 1');
      const databaseUrl = this.config.get<string>('database.url');
      const database = databaseUrl ? new URL(databaseUrl) : null;
      const host = database?.hostname || 'unknown';
      const port = database?.port || '5432';
      const dbName = database?.pathname.replace(/^\/+/, '') || 'unknown';
      this.logger.log(`PostgreSQL connected successfully (${host}:${port}/${dbName})`);
    } catch (error) {
      this.logger.error(
        'PostgreSQL connection failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
