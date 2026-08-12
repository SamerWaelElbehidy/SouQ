import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('products')
@UseGuards(ThrottlerGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /** GET /products — public, paginated with filters */
  @Public()
  @Get()
  findAll(@Query() query: QueryProductsDto) {
    return this.productsService.findAll(query);
  }

  /** GET /products/my — authenticated seller's own products */
  @Get('my')
  findMine(@CurrentUser() user: { userId: string }) {
    return this.productsService.findMyProducts(user.userId);
  }

  /** GET /products/:id — public, single product detail */
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  /** POST /products — authenticated sellers create a product */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(user.userId, dto);
  }

  /** PATCH /products/:id — seller can update their own product */
  @Patch(':id')
  update(
    @CurrentUser() user: { userId: string },
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Partial<CreateProductDto>,
  ) {
    return this.productsService.update(user.userId, id, dto);
  }

  /** DELETE /products/:id — seller can delete their own product */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser() user: { userId: string },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productsService.remove(user.userId, id);
  }
}
