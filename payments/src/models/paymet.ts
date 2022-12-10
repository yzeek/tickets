import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


interface PaymentAttrs {
    orderId: string;
    stripeId: string;
}

interface PaymentDoc extends mongoose.Document<PaymentAttrs> {
    orderId: string;
    stripeId: string;
    // version: number;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
    build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema({
    orderId: {
        required: true,
        type: String,
    },

    stripeId: {
        required: true,
        type: String,
    }

}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
paymentSchema.set('versionKey', 'version');
paymentSchema.plugin(updateIfCurrentPlugin);

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
    return new Payment({
        orderId: attrs.orderId,
        stripeId: attrs.stripeId,
    })
}

export const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', paymentSchema)