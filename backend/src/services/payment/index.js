// services/payment/index.js
const { createOrder: createOrderInDB, verifyAndSavePayment } = require("../../repositories/payment");

exports.createOrder = async (userId, batchId, amount) => {
  if (!userId || !batchId || !amount) {
    return {
      statusCode: 400,
      message: "User ID, Batch ID, and Amount are required to create an order",
      data: null,
    };
  }

  const order = await createOrderInDB(userId, batchId, amount);

  if (!order) {
    return {
      statusCode: 500,
      message: "Failed to create order",
      data: null,
    };
  }

  return {
    statusCode: 201,
    message: "Order created successfully",
    data: order,
  };
};

exports.verifyOrder = async (
  userId,
  batchId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
) => {
  if (!userId || !batchId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return {
      statusCode: 400,
      message: "All payment verification fields are required",
      data: null,
    };
  }

  const verifiedPayment = await verifyAndSavePayment(
    userId,
    batchId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  );

  if (!verifiedPayment) {
    return {
      statusCode: 400,
      message: "Payment verification failed or not saved",
      data: null,
    };
  }

  return {
    statusCode: 200,
    message: "Payment verified and saved successfully",
    data: verifiedPayment,
  };
};
