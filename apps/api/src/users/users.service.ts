import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByGoogleId(googleId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { googleId } });
  }

  createLocal(data: { fullName: string; email: string; passwordHash: string }): Promise<User> {
    return this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        passwordHash: data.passwordHash,
        isVerified: false,
      },
    });
  }

  createFromGoogle(data: { fullName: string; email: string; googleId: string; avatarUrl?: string }): Promise<User> {
    return this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        googleId: data.googleId,
        avatarUrl: data.avatarUrl,
        isVerified: true, // Google already verified the email address
      },
    });
  }

  markVerified(id: string): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { isVerified: true } });
  }
}
