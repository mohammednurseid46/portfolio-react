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
    .setTitle('Mohammednur Seid Portfolio API')
    .setDescription(
      'Public portfolio and administration API for Mohammednur Seid.\n\n' +
      'The **About** section provides the public profile, tagline, roles, contact email, and social links used by the portfolio.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const openApiDocument = SwaggerModule.createDocument(app, swaggerConfig);
  const docsCsp = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.scalar.com; img-src 'self' data: https:; font-src 'self' data: https://cdn.jsdelivr.net https://fonts.scalar.com; connect-src 'self' https:;";
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

  const port = configService.get<number>('port') || 3000;
  await app.listen(port);
  const logger = new Logger('Server');
  logger.log(`Server URL: http://localhost:${port}`);
  logger.log(`API base URL: http://localhost:${port}/api`);
  logger.log(`Health URL: http://localhost:${port}/api/health`);
}

bootstrap();
