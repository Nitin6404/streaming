const express = require("express");
const { handleSubjectCreation } = require("../../controllers/subject");
const { validateSubjectCreationAndEditing } = require("../../validators/subject");
const { validateRequest } = require("../../middleware/validateRequest");

const router = express.Router();

/**
 * @swagger
 * /api/subject/create-subject:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjectName:
 *                 type: string
 *                 example: "Mathematics"
 *               code:
 *                 type: string
 *                 example: "MATH101"
 *               streamSessions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Subject created successfully
 */
router
  .route("/create-subject")
  .post(validateSubjectCreationAndEditing, validateRequest, handleSubjectCreation);

module.exports = router;
