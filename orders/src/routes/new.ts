import mongoose from "mongoose";
import express, { Request, Response } from "express";
import {
    BadRequestError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest
} from '@yzk-tickets/ticketingcore';
import { body } from "express-validator";
import { Ticket } from '../models/ticket';
import { Order } from "../models/order";
import { natsWrapper } from '../nats-wrapper';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
    "/api/orders/",
    requireAuth,
    [
        body('ticketId')
            .not()
            .isEmpty()
            // assumes that the service uses mongo database
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('Ticket Id required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { ticketId } = req.body;

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) throw new NotFoundError();

        //make sure ticket not reserved
        const isReserved = await ticket.isReserved();
        if (isReserved) throw new BadRequestError('Ticket is already reserved');

        //calculate experationDate for order
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + EXPIRATION_WINDOW_SECONDS);

        //build the order and save to db
        const order = Order.build({
            expiresAt: expirationDate,
            status: OrderStatus.Created,
            ticket: ticket,
            userId: req.currentUser!.id
        });
        await order.save();

        //publish an event that order was created
        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            status: order.status,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            ticket: {
                id: ticket.id,
                price: ticket.price
            }
        })


        res.status(201).send(order)
    }
);
export { router as newOrderRouter };
