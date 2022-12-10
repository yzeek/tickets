
import { Message } from "node-nats-streaming";
import { Subjects, BaseListener, PaymentCreatedEvent, OrderStatus, BadRequestError } from "@yzk-tickets/ticketingcore";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends BaseListener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message):
        Promise<void> {
        console.log('Payment created')

        const { id, orderId, stripeId } = data;
        const order = await Order.findById(orderId);

        if (!order) throw new Error(`Order  not found`);

        order.set('status', OrderStatus.Complete);
        await order.save();
        msg.ack()
    }
}