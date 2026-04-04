import express from 'express';
import {
        bookingPaymentHandler,
        verifyPaymentHandler,
} from '#controllers/booking.controller';
const router = express.Router();

router.post('/verify', verifyPaymentHandler);
router.post('/booking', bookingPaymentHandler);

export default router;
