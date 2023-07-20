import { Injectable, Sse } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductCreatedEvent } from 'src/events/created.product.event';

@Injectable()
export class NotificationsService {
    @OnEvent('created.product')
    async notifyUser (payload: ProductCreatedEvent) {
        return 'hola'
    }
}
