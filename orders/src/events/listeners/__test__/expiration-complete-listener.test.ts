import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { natsWrapper } from '../../../nats-wrapper';
import { ExpirationCompleteListener } from '../expiration-ceomplete-listener';
import { Ticket } from '../../../models/ticket';
import { Order, OrderStatus } from '../../../models/order';
import { ExpirationCompleteEvent } from '@yzk-tickets/ticketingcore';
const setup = async () => {
    // create an instance of the listener
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        title: "test exp complete"

    })

    await ticket.save();
    const order = Order.build({
        userId: 'sfssf',
        expiresAt: new Date(),
        status: OrderStatus.Created,
        ticket: ticket
    })
    await order.save();
    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { msg, listener, order, ticket, data }
};

it('updates the orderstatus to canceled', async () => {
    const { msg, listener, order, data } = await setup();

    await listener.onMessage(data, msg);
    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits order canceled event', async () => {
    const { msg, listener, order, data } = await setup();

    await listener.onMessage(data, msg);
    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );

    expect(eventData.id).toEqual(order.id);

});

it('acs the message', async () => {
    const { msg, listener, data } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});
