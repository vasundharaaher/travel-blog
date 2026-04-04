import { numberSchema } from '#validation/common.validation';
import db from '#db';
import Razorpay from 'razorpay';
import {
        validatePaymentVerification,
        validateWebhookSignature,
} from 'razorpay/dist/utils/razorpay-utils.js';

var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const bookingPayment = async (req) => {
        const blog_id = numberSchema.parse(req.body.blog_id);
        const blogDetails = await db.travel_blog.findFirst({
                where: {
                        blog_id,
                },
        });
        if (blogDetails.cost) {
                // create order

                const options = {
                        amount: blogDetails.cost * 100,
                        currency: 'INR',
                        // receipt: `receipt_${Date.now()}`,
                };
                const rzpData = await instance.orders.create(options);
                // payment attempted
                const bookingDetails = await db.booking.create({
                        data: {
                                blog_id,
                                user_id: req.user.user_id,
                                amount: rzpData.amount,
                                currency: rzpData.currency,
                                order_id: rzpData.id,
                                status: rzpData.status,
                                // receipt: options.receipt,
                        },
                });

                return bookingDetails;
        }
        throw new Error('Somthing went wrong while creating order;');
};

export const verifyPayment = async (req) => {
        // verify payment
        // booking table update

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
                req.body;
        const isValidepayment = validatePaymentVerification(
                {
                        order_id: razorpay_order_id,
                        payment_id: razorpay_payment_id,
                },
                razorpay_signature,
                process.env.RAZORPAY_KEY_SECRET
        );
        if (isValidepayment) {
                const bookingDetails = await db.booking.update({
                        where: {
                                order_id: razorpay_order_id,
                        },
                        data: {
                                razorpay_payment_id,
                                razorpay_signature,
                                status: 'paid',
                        },
                });
                return bookingDetails;
        }
};
