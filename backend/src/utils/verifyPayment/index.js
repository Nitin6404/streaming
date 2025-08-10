const crypto = require("crypto");

function verifyPaymentSignature({ orderId, paymentId, signature }) {
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    return expectedSignature === signature;
}

module.exports = verifyPaymentSignature;
