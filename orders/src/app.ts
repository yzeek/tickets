import express, { json } from 'express';
import 'express-async-errors'
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@yzk-tickets/ticketingcore';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrdersRouter } from './routes/index';
import { deleteOrdersRouter } from './routes/delete';


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
app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(indexOrdersRouter)
app.use(deleteOrdersRouter)
app.get('*', async () => {
    throw new NotFoundError()
})
app.use(errorHandler)

export { app }
