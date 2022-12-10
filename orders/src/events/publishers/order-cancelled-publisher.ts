
import { Publisher, OrderCancelledEvent, Subjects } from "@yzk-tickets/ticketingcore";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}