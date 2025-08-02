const express = require("express");
const {
  handleNoteCreation,
  handleNoteUpdation,
  handleNoteDeletion,
  handleNoteRead
} = require("../../controllers/note");
const {
  validateNoteCreation,
  validateNoteUpdate,
  validateNoteDelete,
  validateNoteRead
} = require("../../validators/note/index");

const { validateRequest } = require("../../middleware/validateRequest/index");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management APIs
 */

/**
 * @swagger
 * /api/notes/create-note:
 *   post:
 *     summary: Upload a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notesTitle
 *               - notesUrl
 *               - subjectId
 *               - streamId
 *               - uploadedBy
 *             properties:
 *               notesTitle:
 *                 type: string
 *                 example: "Intro to Thermodynamics"
 *               notesUrl:
 *                 type: string
 *                 example: "https://cdn.server.com/notes/thermo.pdf"
 *               subjectId:
 *                 type: string
 *                 example: "64f123abc123def456789abc"
 *               streamId:
 *                 type: string
 *                 example: "64f456def123abc456789def"
 *               uploadedBy:
 *                 type: string
 *                 example: "64f999abc000def456789aaa"
 *     responses:
 *       200:
 *         description: Note uploaded successfully
 */
router.route("/create-note").post(validateNoteCreation,validateRequest,handleNoteCreation);

/**
 * @swagger
 * /api/notes/update-note:
 *   post:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notesTitle
 *               - updatedNote
 *             properties:
 *               notesTitle:
 *                 type: string
 *                 example: "Intro to Thermodynamics"
 *               updatedNote:
 *                 type: object
 *                 example:
 *                   notesUrl: "https://cdn.server.com/notes/thermo_updated.pdf"
 *     responses:
 *       200:
 *         description: Note updated successfully
 */
router.route("/update-note").put(validateNoteUpdate, validateRequest, handleNoteUpdation);


/**
 * @swagger
 * /api/notes/delete-note:
 *   post:
 *     summary: Delete a note by title
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notesTitle
 *             properties:
 *               notesTitle:
 *                 type: string
 *                 example: "Intro to Thermodynamics"
 *     responses:
 *       200:
 *         description: Note deleted successfully
 */
router.route("/delete-note").delete(validateNoteDelete, validateRequest, handleNoteDeletion);

/**
 * @swagger
 * /api/notes/read-note:
 *   post:
 *     summary: Read a note by title or list all by subject
 *     tags: [Notes]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notesTitle:
 *                 type: string
 *                 example: "Intro to Thermodynamics"
 *               subjectId:
 *                 type: string
 *                 example: "64f123abc123def456789abc"
 *     responses:
 *       200:
 *         description: Note(s) retrieved successfully
 */
router.route("/read-note").get(validateNoteRead, validateRequest, handleNoteRead);

module.exports = router;
