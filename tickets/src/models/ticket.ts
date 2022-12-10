import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
interface ITicketAttributes {
    title: string;
    price: number;
    userId: string;
}
interface ITicketDocument extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string
}
interface ITicketModel extends mongoose.Model<any> {
    build(attrs: ITicketAttributes): ITicketDocument;
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
    },
    userId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
    }
}, {
    // versionKey: false
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id
        }
    }
})
ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: ITicketAttributes) => {
    return new Ticket(attrs)
}

const Ticket = mongoose.model<ITicketDocument, ITicketModel>('Ticket', ticketSchema);


export { Ticket }