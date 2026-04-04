import { bookingPayment, verifyPayment } from '#services/booking.service';
import { success } from 'zod';

export const bookingPaymentHandler = (req, res) => {
        const booking = bookingPayment(req);
        res.status(200).json({ orderDetails: booking });
};

export const verifyPaymentHandler = (req, res) => {
        const bookingDetails = verifyPayment(req);
        res.status(200).json({
                orderDetails: bookingDetails,
                success: true,
                msg: 'Success',
        });
};
