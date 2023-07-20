import {Injectable} from '@nestjs/common';
import {fromEvent, Subject} from "rxjs";
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class EventsService {

//     private readonly emitter: EventEmitter;

//     constructor() {
//         this.emitter = new EventEmitter();
//     }

//     subscribe() {
//         return fromEvent(this.emitter, 'created.product');
//     }

//     async emit(data) {
//         this.emitter.emit('created.prduct', {data});
//     }

//     notificationEvents: Record<string, Subject<any>> = {}

//     async handleConnection(id: string) {
//         if (!this.notificationEvents[id]) {
//             this.notificationEvents[id] = new Subject();
//         }

//         setInterval(() => {
//             this.notificationEvents[id].next({ data: { message: 'Hello World' } });
//         }, 1000);

//         return this.notificationEvents[id].asObservable();
//   }

private readonly emitter: EventEmitter2

    constructor() // no service can be injected, or the sse/emitter will stop working!
    {
        this.emitter = new EventEmitter2()
    }
   
    subscribe() {
        console.log('subscirbin')
        return fromEvent(this.emitter, `created.product`);
    }

    emit(eventName, payload) {
        console.log('emmiting')
        this.emitter.emit(eventName, payload)
    }

}