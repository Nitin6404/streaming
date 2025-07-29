const express = require("express");
const {
  handleSubjectCreation,
  handleUpdateSubject,
  handleSubjectDeletion
} = require("../../controllers/subject");

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


/**
 * @swagger
 * /api/subject/update-subject:
 *   put:
 *     summary: Update an existing subject
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
 *               updatedSubject:
 *                 type: object
 *                 properties:
 *                   subjectName:
 *                     type: string
 *                     example: "Advanced Mathematics"
 *                   code:
 *                     type: string
 *                     example: "MATH102"
 *     responses:
 *       200:
 *         description: Subject updated successfully
 */
router
  .route("/update-subject")
  .put(validateSubjectCreationAndEditing, validateRequest, handleUpdateSubject);



/**
 * @swagger
 * /api/subject/delete-subject:
 *   delete:
 *     summary: Delete an existing subject
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
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *       404:
 *         description: Subject not found
 */
router
  .route("/delete-subject")
  .delete(validateRequest, handleSubjectDeletion);



module.exports = router;
