
import { ExpirationCompleteEvent, Publisher, Subjects } from "@yzk-tickets/ticketingcore";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}