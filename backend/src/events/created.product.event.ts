export class ProductCreatedEvent {
    constructor(public readonly _id: string, public readonly name: string) {}
}