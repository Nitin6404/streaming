const express = require("express");
const {
  handleUserRegister,
  handleUserLogin
} = require("../../controllers/auth/index");

const {
  validateMobileAndOTP
} = require("../../validators/auth/index");

const {
  validateRequest
} = require("../../middleware/validateRequest/index");

const router = express.Router();

/**
 * @swagger
 * /api/auth/user:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "John Doe"
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router
  .route("/register")
  .post(validateMobileAndOTP, validateRequest, handleUserRegister);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 */
router
  .route("/login")
  .post(validateMobileAndOTP, validateRequest, handleUserLogin);

module.exports = router;
