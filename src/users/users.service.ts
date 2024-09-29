import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    if (users.length === 0) throw new HttpException('Users not found', 404);
    return users;
  }

  findOne(id: string) {
    const user = this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);
    return this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    const user = this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    const user = this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);
    return this.prismaService.user.delete({ where: { id } });
  }
}
