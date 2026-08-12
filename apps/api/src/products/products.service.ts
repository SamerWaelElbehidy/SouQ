import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';

const PRODUCT_SELECT = {
  id: true,
  name: true,
  description: true,
  price: true,
  priceAfterDiscount: true,
  images: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  category: { select: { id: true, name: true, slug: true } },
  seller: { select: { id: true, fullName: true, avatarUrl: true } },
  _count: { select: { orders: true } },
} satisfies Prisma.ProductSelect;

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categories: CategoriesService,
  ) {}

  /** Public — paginated product listing with optional filters. */
  async findAll(dto: QueryProductsDto) {
    const page    = dto.page    ?? 1;
    const perPage = dto.perPage ?? 12;
    const skip    = (page - 1) * perPage;

    // Resolve category: accept either slug or UUID
    let categoryId: string | undefined;
    if (dto.category) {
      // Try UUID first, then slug
      const isUuid = /^[0-9a-f-]{36}$/i.test(dto.category);
      if (isUuid) {
        categoryId = dto.category;
      } else {
        try {
          const cat = await this.categories.findBySlug(dto.category);
          categoryId = cat.id;
        } catch {
          categoryId = undefined; // Unknown slug → return empty
        }
      }
    }

    const where: Prisma.ProductWhereInput = {
      ...(dto.approvedOnly !== false ? { status: 'APPROVED' } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(dto.q
        ? {
            OR: [
              { name:        { contains: dto.q, mode: 'insensitive' } },
              { description: { contains: dto.q, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    // Sorting
    let orderBy: Prisma.ProductOrderByWithRelationInput;
    switch (dto.sort) {
      case 'price_asc':  orderBy = { price: 'asc' };  break;
      case 'price_desc': orderBy = { price: 'desc' }; break;
      case 'oldest':     orderBy = { createdAt: 'asc' }; break;
      case 'popular':    orderBy = { orders: { _count: 'desc' } }; break;
      default:           orderBy = { createdAt: 'desc' }; // newest
    }

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({ where, orderBy, skip, take: perPage, select: PRODUCT_SELECT }),
      this.prisma.product.count({ where }),
    ]);

    return { data, total, page, perPage };
  }

  /** Public — single product detail. */
  async findOne(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, status: 'APPROVED' },
      select: PRODUCT_SELECT,
    });
    if (!product) throw new NotFoundException('المنتج غير موجود');
    return product;
  }

  /** Authenticated — create a product (starts as PENDING). */
  async create(sellerId: string, dto: CreateProductDto) {
    // Verify category exists
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new BadRequestException('التصنيف المحدد غير موجود');
    }

    return this.prisma.product.create({
      data: {
        name:               dto.name,
        description:        dto.description,
        price:              dto.price,
        priceAfterDiscount: dto.priceAfterDiscount ?? null,
        images:             dto.images ?? [],
        categoryId:         dto.categoryId,
        sellerId,
        status:             'PENDING',
      },
      select: PRODUCT_SELECT,
    });
  }

  /** Authenticated — seller can update their own product. */
  async update(sellerId: string, productId: string, dto: Partial<CreateProductDto>) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.sellerId !== sellerId) {
      throw new NotFoundException('المنتج غير موجود أو ليس لديك صلاحية تعديله');
    }

    return this.prisma.product.update({
      where: { id: productId },
      data: {
        ...(dto.name        !== undefined ? { name:               dto.name }        : {}),
        ...(dto.description !== undefined ? { description:        dto.description }  : {}),
        ...(dto.price       !== undefined ? { price:              dto.price }        : {}),
        ...(dto.images      !== undefined ? { images:             dto.images }       : {}),
        // Reset to PENDING after edits so admin re-reviews
        status: 'PENDING',
      },
      select: PRODUCT_SELECT,
    });
  }

  /** Authenticated — seller can delete their own product. */
  async remove(sellerId: string, productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.sellerId !== sellerId) {
      throw new NotFoundException('المنتج غير موجود أو ليس لديك صلاحية حذفه');
    }
    await this.prisma.product.delete({ where: { id: productId } });
    return { message: 'تم حذف المنتج بنجاح' };
  }

  /** Seller's own product list (all statuses). */
  async findMyProducts(sellerId: string) {
    return this.prisma.product.findMany({
      where: { sellerId },
      orderBy: { createdAt: 'desc' },
      select: PRODUCT_SELECT,
    });
  }
}
