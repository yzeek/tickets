
import { Publisher, OrderCreatedEvent, Subjects } from "@yzk-tickets/ticketingcore";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}