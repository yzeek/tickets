import express from 'express';
import 'express-async-errors'
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from '@yzk-tickets/ticketingcore';
import { NotFoundError } from '@yzk-tickets/ticketingcore';
const app = express();
app.set('trust proxy', true)
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false,

}))

/** user routes */
app.use(currentUserRouter);
app.use(signoutRouter)
app.use(signinRouter)
app.use(signupRouter)

app.get('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app } 
