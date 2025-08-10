const express = require("express");
const router = express.Router();
const {
  handleCreateOrder,
  handleVerifyPayment
} = require("../../controllers/payment/index");

/**
 * @swagger
 * /api/payment/create-order:
 *   post:
 *     summary: Create a new Razorpay order
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "64f3ac98b7620c001f0c1234"
 *               batchId:
 *                 type: string
 *                 example: "64f3ac98b7620c001f0c5678"
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Failed to create order
 */
router
  .route("/create-order")
  .post(handleCreateOrder);

/**
 * @swagger
 * /api/payment/verify-payment:
 *   post:
 *     summary: Verify Razorpay payment and save payment details
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "64f3ac98b7620c001f0c1234"
 *               batchId:
 *                 type: string
 *                 example: "64f3ac98b7620c001f0c5678"
 *               razorpayOrderId:
 *                 type: string
 *                 example: "order_KYB1aT3qEXAMPLE"
 *               razorpayPaymentId:
 *                 type: string
 *                 example: "pay_KYB1aT3qEXAMPLE"
 *               razorpaySignature:
 *                 type: string
 *                 example: "e5c8aEXAMPLESIGNATURE=="
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Payment verification failed
 */
router
  .route("/verify-payment")
  .post(handleVerifyPayment);

module.exports = router;
