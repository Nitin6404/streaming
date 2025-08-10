const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
  handleAllUserSearch,
  handleSingleUserSearch
} = require("../../controllers/auth/index");

const {
  validateMobileAndOTP,
  validateUserSearch
} = require("../../validators/auth/index");

const {
  validateRequest
} = require("../../middleware/validateRequest/index");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
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

/**
 * @swagger
 * /api/auth/search:
 *   get:
 *     summary: Get all users or search user by phone number
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         required: false
 *         description: Phone number to search a specific user
 *     responses:
 *       200:
 *         description: User(s) retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User(s) retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: John Doe
 *                       phoneNumber:
 *                         type: string
 *                         example: "1234567890"
 */

router.route("/search").get(validateUserSearch,validateRequest,handleAllUserSearch);

module.exports = router;
