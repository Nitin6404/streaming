const { body } = require("express-validator");

exports.validateNoteCreation = [
  body("notesTitle")
    .notEmpty().withMessage("Note title is required")
    .isString().withMessage("Note title must be a string"),
  body("notesUrl")
    .notEmpty().withMessage("Note URL is required")
    .isURL().withMessage("Invalid URL"),
  body("subjectId")
    .notEmpty().withMessage("Subject ID is required")
    .isMongoId().withMessage("Invalid Subject ID"),
  body("streamId")
    .notEmpty().withMessage("Stream ID is required")
    .isMongoId().withMessage("Invalid Stream ID"),
  body("uploadedBy")
    .notEmpty().withMessage("Uploader is required")
    .isMongoId().withMessage("Invalid uploader ID")
];

exports.validateNoteUpdate = [
  body("notesTitle")
    .notEmpty().withMessage("Note title is required")
    .isString().withMessage("Note title must be a string"),
  body("updatedNote")
    .notEmpty().withMessage("Updated note content is required")
    .isObject().withMessage("Updated note must be an object")
];

exports.validateNoteDelete = [
  body("notesTitle")
    .notEmpty().withMessage("Note title is required")
    .isString().withMessage("Note title must be a string")
];

exports.validateNoteRead = [
  body("subjectId")
    .optional()
    .isMongoId().withMessage("Invalid Subject ID"),
  body("notesTitle")
    .optional()
    .isString().withMessage("Note title must be a string")
];
