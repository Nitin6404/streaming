const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
  handleAllUserSearch,
  handleSingleUserSearch,
  handleUserUpdation,
  handleUserDeletion
} = require("../../controllers/auth/index");

const {
  validateMobileAndOTP,
  validateUserSearch,
  validateUserUpdation,
  validateUserDeletion
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


/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update user details (username or phone number)
 *     tags: [User]
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
 *               updatedData:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: "New Name"
 *                   phoneNumber:
 *                     type: string
 *                     example: "9876543210"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router
  .route("/update")
  .put(validateUserUpdation, validateRequest, handleUserUpdation);

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *     summary: Delete a user by phone number
 *     tags: [User]
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
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router
  .route("/delete")
  .delete(validateUserDeletion, validateRequest, handleUserDeletion);

module.exports = router;



module.exports = router;
