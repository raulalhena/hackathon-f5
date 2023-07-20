import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import EventEmitter from 'events';
import { EventsService } from 'src/modelevents/events.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, EventsService]
})
export class ProductsModule {}
