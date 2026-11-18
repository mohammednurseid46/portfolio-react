import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const admin = await this.prisma.admin.findFirst({
      select: {
        name: true, tagline: true, intro: true, email: true, phone: true,
        linkedin: true, github: true, roles: true,
      },
    });
    if (!admin) throw new BadRequestException('Profile is not initialized');
    return {
      name: admin.name,
      tagline: admin.tagline,
      intro: admin.intro,
      email: admin.email,
      phone: admin.phone,
      phoneLabel: admin.phone,
      links: { linkedin: admin.linkedin, github: admin.github },
      roles: admin.roles,
    };
  }

  async getAdmin(user: { sub: string }) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: user.sub },
      select: {
        id: true, username: true, name: true, tagline: true, intro: true,
        email: true, phone: true, linkedin: true, github: true, roles: true, createdAt: true,
      },
    });
    if (!admin) throw new UnauthorizedException('Invalid authentication');
    return admin;
  }

  async update(user: { sub: string }, dto: UpdateProfileDto) {
    const admin = await this.prisma.admin.findUnique({ where: { id: user.sub } });
    if (!admin) throw new UnauthorizedException('Invalid authentication');

    if (dto.username && dto.username !== admin.username) {
      const used = await this.prisma.admin.findUnique({ where: { username: dto.username } });
      if (used) throw new ConflictException('Username is already in use');
    }
    if (dto.newPassword) {
      if (!dto.currentPassword) throw new BadRequestException('Current password is required');
      const valid = await bcrypt.compare(dto.currentPassword, admin.passwordHash);
      if (!valid) throw new UnauthorizedException('Current password is incorrect');
    }

    const passwordHash = dto.newPassword ? await bcrypt.hash(dto.newPassword, 10) : admin.passwordHash;
    const updated = await this.prisma.admin.update({
      where: { id: admin.id },
      data: {
        username: dto.username ?? admin.username,
        passwordHash,
        name: dto.name ?? admin.name,
        email: dto.email ?? admin.email,
        phone: dto.phone ?? admin.phone,
        tagline: dto.tagline ?? admin.tagline,
        intro: dto.intro ?? admin.intro,
        linkedin: dto.linkedin ?? admin.linkedin,
        github: dto.github ?? admin.github,
        roles: dto.roles ?? admin.roles,
      },
      select: {
        id: true, username: true, name: true, tagline: true, intro: true,
        email: true, phone: true, linkedin: true, github: true, roles: true, createdAt: true,
      },
    });
    return updated;
  }
}
