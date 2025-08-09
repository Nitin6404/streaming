const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "order", required: true },
    razorpayPaymentId: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpaySignature: { type: String, required: true },
    status: { type: String, enum: ["success", "failed"], required: true },
    paidAt: { type: Date }
}, { timestamps: true });

const Payment = mongoose.model("payment", paymentSchema);

module.exports = { Payment };
