import mongoose from 'mongoose';
import { app } from './app'
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { natsWrapper } from './nats-wrapper';

const initialize = async () => {
    console.log(' starting tickets .latest')

    if (!process.env.JWT_KEY) throw new Error('JWT_KEY is required')
    if (!process.env.MONGO_URI) throw new Error('JWT_KEY is required')
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS_CLIENT_ID must be defined");
    }
    if (!process.env.NATS_URL) {
        throw new Error("NATS_URL must be defined");
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS_CLUSTER_ID must be defined");
    }
    try {
        mongoose.set('strictQuery', false);
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        natsWrapper.client.on('close', () => {
            console.log('nats connection closed');
            process.exit();
        })
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected!');
    } catch (error) {
        console.error(error);
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
}
initialize(); 