import { Controller, Body, Patch, Get, Query, Sse, Param } from '@nestjs/common';
import { CreateFavoriteDto } from './dtos/create.favorite.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Observable, fromEvent, interval, map } from 'rxjs';
import { ProductCreatedEvent } from 'src/events/created.product.event';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService,
        private readonly eventEmitter: EventEmitter2
    ){}

    @Sse('categories')
    events(@Query('category') category_: string, @Query('userId') userId_: string) {
      this.favoritesService.add({ userId: userId_, type: 'categories', name: category_ });
      return fromEvent(this.eventEmitter, `created.${category_}`).pipe(map((_) => ({ data: `Nuevo producto en la categoría ${category_}` })));
    }

    @Patch('categories')
    add(@Body() createFavoriteDto: CreateFavoriteDto) {
        return this.favoritesService.add(createFavoriteDto);
    }

    @Get(':id')
    findAll(@Param('id') id: string){
        return this.favoritesService.findAll(id);
    }
}
