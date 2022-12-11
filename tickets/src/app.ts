import express, { json } from 'express';
import 'express-async-errors'
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@yzk-tickets/ticketingcore';
import { ticketsRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexticketRouter } from './routes/index';
import { updateTicketsRouter } from './routes/update';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);
app.use(currentUser);/** user routes */
app.use(ticketsRouter)
app.use(showTicketRouter)
app.use(indexticketRouter)
app.use(updateTicketsRouter)
app.get('*', async () => {
    throw new NotFoundError()
})
app.use(errorHandler)

export { app }
