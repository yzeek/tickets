
import { PaymentCreatedEvent, Subjects, Publisher } from "@yzk-tickets/ticketingcore";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

}