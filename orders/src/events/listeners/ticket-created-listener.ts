
import { Message } from "node-nats-streaming";
import { Subjects, BaseListener, TicketCreatedEvent } from "@yzk-tickets/ticketingcore";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message):
        Promise<void> {
        console.log('ticket created')

        const { id, title, price, userId } = data;
        const ticket = Ticket.build({
            id: data.id,
            price: price,
            title: title
        });
        await ticket.save();
        msg.ack()
    }
}