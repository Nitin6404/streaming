const express = require("express");
const { handleBatchCreation, handleBatchUpdation, handleBatchDeletion, handleBatchRead } = require("../../controllers/batch");
const { validateBatchCreationAndEdititng, validateBatchUpdation, validateReadBatch } = require("../../validators/batch");
const { validateRequest } = require("../../middleware/validateRequest");
const router = express.Router();

/**
 * @swagger
 * /api/batch/create-batch:
 *   post:
 *     summary: Create a new batch
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batchName
 *               - subjectIds
 *               - instructorIds
 *             properties:
 *               batchName:
 *                 type: string
 *                 example: "Batch A"
 *               subjectIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64c7654321abcde123456789", "64c7654321abcde987654321"]
 *               instructorIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64c7654321abcde123456789"]
 *     responses:
 *       201:
 *         description: Batch created successfully
 */

router
  .route("/create-batch")
  .post(validateBatchCreationAndEdititng, validateRequest, handleBatchCreation);

/**
 * @swagger
 * /api/batch/update-batch:
 *   post:
 *     summary: Update an existing batch
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batchName
 *               - updatedBatch
 *             properties:
 *               batchName:
 *                 type: string
 *                 example: "Batch A"
 *               updatedBatch:
 *                 type: object
 *                 properties:
 *                   batchName:
 *                     type: string
 *                     example: "Batch A - Updated"
 *                   subjectIds:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["64c7654321abcde123456789"]
 *                   instructorIds:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["64c7654321abcde123456789"]
 *     responses:
 *       200:
 *         description: Batch updated successfully
 */

router.route("/update-batch").post(validateBatchUpdation,validateRequest,handleBatchUpdation);


/**
 * @swagger
 * /api/batch/delete-batch:
 *   delete:
 *     summary: Delete a batch by name
 *     tags: [Batch]
 *     parameters:
 *       - in: query
 *         name: batchName
 *         required: true
 *         schema:
 *           type: string
 *         example: "Batch A"
 *     responses:
 *       200:
 *         description: Batch deleted successfully
 */

router.route("/delete-batch").delete(validateRequest,handleBatchDeletion);

/**
 * @swagger
 * /api/batch/read-batch:
 *   get:
 *     summary: Get batch information by batchName (optional)
 *     tags: [Batch]
 *     parameters:
 *       - in: query
 *         name: batchName
 *         schema:
 *           type: string
 *         required: false
 *         description: Name of the batch to retrieve
 *     responses:
 *       200:
 *         description: Batch data retrieved successfully
 *       404:
 *         description: Batch not found
 */
router.route("/read-batch").get(validateReadBatch,validateRequest,handleBatchRead);
module.exports = router;
