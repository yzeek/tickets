import { Publisher, Subjects, TicketUpdatedEvent } from "@yzk-tickets/ticketingcore";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
