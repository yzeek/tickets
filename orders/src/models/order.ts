import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { OrderStatus } from '@yzk-tickets/ticketingcore';
import { ITicketDocument } from './ticket';

export { OrderStatus }
interface OrderAtters {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: ITicketDocument;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: ITicketDocument;
    version: number;

}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAtters): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        required: true,
        defaults: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id
        }
    }
})
orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAtters) => {
    return new Order(attrs)
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

export { Order } 