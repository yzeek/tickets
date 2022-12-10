import { Publisher, Subjects, TicketCreatedEvent } from "@yzk-tickets/ticketingcore";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}
