// controllers/payment/index.js

const {
  createOrder: createOrderService,
  verifyAndSavePayment
} = require("../../services/payment");
const ApiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

// Create Order
exports.handleCreateOrder = asyncHandler(async (req, res) => {
  const { userId, batchId, amount } = req.body;

  const result = await createOrderService(userId, batchId, amount);
  const { message, data, statusCode = 200 } = result;

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

// Verify Payment
exports.handleVerifyPayment = asyncHandler(async (req, res) => {
  const {
    userId,
    batchId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  } = req.body;

  const result = await verifyAndSavePayment({
    userId,
    batchId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  });

  const { message, data, statusCode = 200 } = result;

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});
