import express, { json } from 'express';
import 'express-async-errors'
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@yzk-tickets/ticketingcore';
import { createChargeRoute } from './routes/new';



const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);
app.use(currentUser);
/** user routes */
app.use(createChargeRoute);

app.get('*', async () => {
    throw new NotFoundError()
})
app.use(errorHandler)

export { app }
