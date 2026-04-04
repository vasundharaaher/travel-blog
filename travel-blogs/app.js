import express from 'express';
// import z from 'zod';
import notfound from '#middlewares/notFound.middleware';
import requestLogger from '#middlewares/request-logger.middleware';
import { numberSchema } from '#validation/common.validation';
// import PI from '#constants/constant';
import errorHandlerMiddleware from '#middlewares/error-handler.middleware';
import authRouter from '#routers/auth.route';
import blogRouter from '#routers/blog.route';
// console.log(PI);
import cors from 'cors';
import helmet from 'helmet';
import jwtmiddleware from '#middlewares/jwt-handle.middleware';
import userRoute from '#routers/user.route';
import bookingRoute from '#routers/booking.route';

const app = express();

const startingBaseURL = '/api/v1/';
app.use(
        cors(),
        helmet({
                crossOriginEmbedderPolicy: false,
                crossOriginResourcePolicy: { policy: 'cross-origin' },
                contentSecurityPolicy: false, // Only if whitelisting (Step 3) doesn't work
        }),
        express.json(),
        requestLogger
);
app.use(`${startingBaseURL}assets`, express.static('./public'));

// app.use(express.json());
app.use(requestLogger);
// app.use(authRouter);
app.use(`${startingBaseURL}auth`, authRouter);
app.use(`${startingBaseURL}app`, jwtmiddleware, blogRouter);
app.use(`${startingBaseURL}app`, jwtmiddleware, userRoute);
app.use(`${startingBaseURL}app`, jwtmiddleware, bookingRoute);

const PORT = process.env.PORT;

// parsing port from that schema
// const portNumber =  numberSchema.parse(PORT);
const portNumber = numberSchema.safeParse(PORT);

if (portNumber.error) {
        console.log('Server has not been started due to port issue');
        process.exit(1);
}

// error not show
app.use(notfound);
app.use(errorHandlerMiddleware);
// listening port locally
app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${portNumber.data}`);
});
