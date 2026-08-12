import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Public — list all top-level and nested categories. */
  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        children: {
          orderBy: { name: 'asc' },
        },
        _count: { select: { products: true } },
      },
    });
  }

  /** Public — find a single category by its slug. */
  async findBySlug(slug: string) {
    const cat = await this.prisma.category.findUnique({
      where: { slug },
      include: { children: true, _count: { select: { products: true } } },
    });
    if (!cat) throw new NotFoundException(`Category '${slug}' not found`);
    return cat;
  }

  /** Admin — create a category (RBAC enforced in Phase 3). */
  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new ConflictException(`Slug '${dto.slug}' is already taken`);
    }
    return this.prisma.category.create({
      data: {
        name:     dto.name,
        slug:     dto.slug,
        parentId: dto.parentId ?? null,
      },
    });
  }

  /** Seed helper — upsert by slug (safe to call repeatedly). */
  async upsert(dto: CreateCategoryDto) {
    return this.prisma.category.upsert({
      where: { slug: dto.slug },
      create: { name: dto.name, slug: dto.slug, parentId: dto.parentId },
      update: { name: dto.name, parentId: dto.parentId },
    });
  }
}
