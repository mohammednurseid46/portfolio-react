import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
process.env.DATABASE_URL = process.env.DATABASE_URL_TEST || process.env.DATABASE_URL;
delete process.env.SMTP_HOST;
delete process.env.SMTP_USER;
delete process.env.SMTP_PASSWORD;
delete process.env.NOTIFY_EMAIL;

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Portfolio API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.set('trust proxy', true);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(() => app.close());

  it('returns seeded public content', async () => {
    const [projects, skills, services, profile] = await Promise.all([
      request(app.getHttpServer()).get('/api/projects').expect(200),
      request(app.getHttpServer()).get('/api/skills').expect(200),
      request(app.getHttpServer()).get('/api/services').expect(200),
      request(app.getHttpServer()).get('/api/profile').expect(200),
    ]);
    expect(projects.body.length).toBeGreaterThan(0);
    expect(skills.body.length).toBeGreaterThan(0);
    expect(services.body.length).toBeGreaterThan(0);
    expect(profile.body.email).toBe('mohammednurseid46@gmail.com');
  });

  it('logs in and rejects a wrong password with a generic error', async () => {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'Moha1995';
    const login = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username, password })
      .expect(201);
    expect(login.body.accessToken).toEqual(expect.any(String));
    const wrong = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username, password: 'wrong-password' })
      .expect(401);
    expect(wrong.body.message).toBe('Invalid username or password');
  });

  it('protects admin routes and has no register endpoint', async () => {
    await request(app.getHttpServer()).get('/api/messages').expect(401);
    await request(app.getHttpServer()).post('/api/auth/register').expect(404);
  });

  it('validates contact messages and rate limits them', async () => {
    await request(app.getHttpServer()).post('/api/contact').send({ name: 'A', email: 'bad', message: 'short' }).expect(400);
    const payload = { name: 'Test Visitor', email: 'visitor@example.com', message: 'This is a valid contact message.' };
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await request(app.getHttpServer()).post('/api/contact').set('X-Forwarded-For', '198.51.100.55').send(payload).expect(201);
    }
    await request(app.getHttpServer()).post('/api/contact').set('X-Forwarded-For', '198.51.100.55').send(payload).expect(429);
  });
});
