import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { OrderStatus, Order } from "./order";
import mongoose from "mongoose";

interface ITicketAttributes {
    title: string;
    price: number;
    id: string;

}

export interface ITicketDocument extends mongoose.Document {
    title: string;
    price: number;
    id: string;
    version: number
    isReserved(): Promise<boolean>;
}

interface ITicketModel extends mongoose.Model<any> {
    build(attrs: ITicketAttributes): ITicketDocument;
    findByEvent(event: { id: string, version: number }): Promise<ITicketDocument | null>
}
const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },

}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
        }
    }
})
ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: ITicketAttributes) => {
    return new Ticket({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
    })
}
ticketSchema.statics.findByEvent = (event: { id: string, version: number }) => {
    return Ticket.findOne({
        _id: event.id,
        version: event.version - 1
    })
}
ticketSchema.methods.isReserved = async function () {
    const exsisting = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    })
    return !!exsisting
}
const Ticket = mongoose.model<ITicketDocument, ITicketModel>('Ticket', ticketSchema);


export { Ticket }