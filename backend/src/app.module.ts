import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FavoritesService } from './favorites/favorites.service';
import { FavoritesController } from './favorites/favorites.controller';

@Module({
  imports: [ProductsModule, EventEmitterModule.forRoot()],
  controllers: [AppController, FavoritesController],
  providers: [AppService, FavoritesService],
})
export class AppModule {}
