import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('categories')
@UseGuards(ThrottlerGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /** GET /categories — public, used by frontend category grid */
  @Public()
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  /** GET /categories/:slug — public, used by product listing filter */
  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  /**
   * POST /categories — admin only.
   * Full RBAC guard wired in Phase 3; for now only authenticated users
   * can call this (global JwtAuthGuard is applied to all non-@Public routes).
   */
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }
}
