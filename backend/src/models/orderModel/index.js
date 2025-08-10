const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "batch", required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    receipt: { type: String, required: true }
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);

module.exports = { Order };
