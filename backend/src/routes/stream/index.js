const express = require("express");
const {
  handleStreamCreation,
  handleStreamUpdation,
  handleStreamDeletion,
  handleStreamRead,
} = require("../../controllers/stream");

const {
  validateStreamCreation,
  validateStreamUpdation,
  validateStreamDeletion,
  validateStreamRead,
} = require("../../validators/stream");

const { validateRequest } = require("../../middleware/validateRequest");

const router = express.Router();

/**
 * @swagger
 * /api/stream/stream-creation:
 *   post:
 *     summary: Create a new stream
 *     tags: [Stream]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - streamName
 *               - subjectId
 *               - instructorId
 *               - streamUrl
 *               - batchId
 *             properties:
 *               streamName:
 *                 type: string
 *                 example: "Physics-Live-Class"
 *               subjectId:
 *                 type: string
 *                 example: "64f123abc123def456789abc"
 *               instructorId:
 *                 type: string
 *                 example: "64f123abc123def456789def"
 *               streamUrl:
 *                 type: string
 *                 example: "https://yourserver.com/stream/physics-hls.m3u8"
 *               batchId:
 *                 type: string
 *                 example: "64f123abc123def456789abc"

 *     responses:
 *       200:
 *         description: Stream created successfully
 */

router.route("/stream-creation").post(
  validateStreamCreation,
  validateRequest,
  handleStreamCreation
);
/**
 * @swagger
 * /api/stream/stream-updation:
 *   put:
 *     summary: Update an existing stream
 *     tags: [Stream]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - streamName
 *               - updatedStream
 *             properties:
 *               streamName:
 *                 type: string
 *                 description: The name of the stream to be updated
 *                 example: "Physics-Live-Class"
 *               updatedStream:
 *                 type: object
 *                 description: Fields to update in the stream
 *                 example:
 *                   streamUrl: "https://updatedserver.com/new-link.m3u8"
 *                   instructorId: "64f123abc123def456789111"
 *                   subjectId: "64f123abc123def456789222"
 *     responses:
 *       200:
 *         description: Stream updated successfully
 */

router.route("/stream-updation").put(
  validateStreamUpdation,
  validateRequest,
  handleStreamUpdation
);

/**
 * @swagger
 * /api/stream/stream-deletion:
 *   delete:
 *     summary: Delete a stream
 *     tags: [Stream]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - streamName
 *             properties:
 *               streamName:
 *                 type: string
 *                 example: "Physics-Live-Class"
 *     responses:
 *       200:
 *         description: Stream deleted successfully
 */
router.route("/stream-deletion").delete(
  validateStreamDeletion,
  validateRequest,
  handleStreamDeletion
);

/**
 * @swagger
 * /api/stream/stream-read/{batchId}:
 *   get:
 *     summary: Get stream(s) by batchId, optionally filter by streamName
 *     tags: [Stream]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the batch
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional stream name to retrieve
 *     responses:
 *       200:
 *         description: Stream(s) found successfully
 */

router.route("/stream-read/:batchId").get(
  validateStreamRead,
  validateRequest,
  handleStreamRead
);

module.exports = router;
