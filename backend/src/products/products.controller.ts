import { Controller, Get, Post, Body, Patch, Param, Delete, Query, MessageEvent, Sse } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('search') 
  search(@Query('filteredBy') filteredBy: string, @Query('keyword') keyword: string, @Query('sortedBy') sortedBy: string) {
    return this.productsService.search(filteredBy, keyword, sortedBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
