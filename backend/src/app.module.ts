import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsService } from './modelevents/events.service';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';
import { FavoritesService } from './favorites/favorites.service';
import { FavoritesController } from './favorites/favorites.controller';

@Module({
  imports: [ProductsModule, EventEmitterModule.forRoot(), NotificationsModule],
  controllers: [AppController, FavoritesController],
  providers: [AppService, EventsService, NotificationsService, FavoritesService],
})
export class AppModule {}
