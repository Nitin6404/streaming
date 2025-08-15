// repositories/payment.js

const razorpay = require("../../config/razorpay/index");
const verifySignature = require("../../utils/verifyPayment/index");
const { Order } = require("../../models/orderModel/index");
const { Payment } = require("../../models/paymentModel");
const { Batch } = require("../../models/batchModel");

// Create Order
exports.createOrder = async (userId, batchId, amount) => {
  try {
    const receipt = "receipt_" + Date.now();

    const options = {
      amount: amount * 100, // Razorpay accepts paise
      currency: "INR",
      receipt,
    };

    const order = await razorpay.orders.create(options);

    const newOrder = await Order.create({
      userId,
      batchId,
      razorpayOrderId: order.id,
      amount,
      currency: "INR",
      receipt,
    });

    return newOrder;
  } catch (err) {
    console.error("Create order error:", err);
    return null;
  }
};

// Verify and Save Payment
exports.verifyAndSavePayment = async (
  userId,
  batchId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
) => {
  try {
    const isValid = verifySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isValid) throw new Error("Invalid payment signature");

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId },
      { status: "paid" },
      { new: true }
    );

    await Payment.create({
      orderId: order._id,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      status: "success",
      paidAt: new Date(),
    });

    await Batch.findByIdAndUpdate(batchId, {
      $addToSet: { studentsIds: userId },
    });

    return order;
  } catch (err) {
    console.error("Verify payment error:", err);
    return null;
  }
};
