import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly requests = new Map<string, number[]>();

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const route = request.path;
    const windowMs = route === '/api/contact' ? 3600000 : 60000;
    const limit = route === '/api/contact' ? 5 : route === '/api/auth/login' ? 5 : 100;
    const key = `${request.ip || 'unknown'}:${route}`;
    const now = Date.now();
    const recent = (this.requests.get(key) || []).filter((timestamp) => timestamp > now - windowMs);
    if (recent.length >= limit) throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
    recent.push(now);
    this.requests.set(key, recent);
    return true;
  }
}
