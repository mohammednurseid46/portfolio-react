import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({ where: { username: dto.username } });
    const valid = admin ? await bcrypt.compare(dto.password, admin.passwordHash) : false;
    if (!admin || !valid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return {
      accessToken: await this.jwt.signAsync({ sub: admin.id, username: admin.username }),
    };
  }

  async me(user: { sub: string }) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: user.sub },
      select: { id: true, username: true, createdAt: true },
    });
    if (!admin) throw new UnauthorizedException('Invalid authentication');
    return admin;
  }
}
