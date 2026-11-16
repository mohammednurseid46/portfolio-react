import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import type { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.getHttpAdapter().getInstance().set('trust proxy', true);
  app.setGlobalPrefix('api');
  app.use(helmet());
  const origins = (configService.get<string>('security.corsOrigins') || '').split(',').map((origin) => origin.trim()).filter(Boolean);
  app.enableCors({ origin: origins });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('Portfolio administration and public content API.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const openApiDocument = SwaggerModule.createDocument(app, swaggerConfig);
  if (configService.get<boolean>('docs.enabled')) {
    const docsCsp = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' data: https://cdn.jsdelivr.net; connect-src 'self' https:;";
    const httpServer = app.getHttpAdapter().getInstance();
    httpServer.use('/docs', (_request: Request, response: Response, next: NextFunction) => {
      response.setHeader('Content-Security-Policy', docsCsp);
      next();
    }, apiReference({
      content: openApiDocument,
      theme: 'purple',
      darkMode: true,
      cdn: 'https://cdn.jsdelivr.net/npm/@scalar/api-reference',
    }));
    httpServer.get('/docs-json', (_request: Request, response: Response) => response.json(openApiDocument));
  }

  const port = configService.get<number>('port') || 3000;
  await app.listen(port);
  const logger = new Logger('Server');
  logger.log(`Server URL: http://localhost:${port}`);
  logger.log(`API base URL: http://localhost:${port}/api`);
  logger.log(`Health URL: http://localhost:${port}/api/health`);
}

bootstrap();
