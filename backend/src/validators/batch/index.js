const { body, query } = require("express-validator");

exports.validateBatchCreationAndEdititng = [
  body("batchName")
    .notEmpty()
    .withMessage("Batch name is required"),
    body("teacherId")
  .notEmpty()
  .withMessage("Teacher ID is required")
  .isMongoId()
  .withMessage("Invalid Teacher ID"),

  body("subjectIds")
    .isArray({ min: 1 })
    .withMessage("At least one subject is required"),

  body("instructorIds")
    .isArray({ min: 1 })
    .withMessage("At least one instructor is required"),

  body("studentIds")
    .optional()
    .isArray({ min: 1 })
    .withMessage("If provided, studentIds must have at least one student"),
];

// validators/batch.js
exports.validateBatchUpdation = [
  body("batchName").notEmpty().withMessage("Batch name to update is required"),
  body("updatedBatch").isObject().withMessage("Updated batch data must be provided"),
];
exports.validateReadBatch = [
  query("batchName")
    .optional()
    .isString()
    .withMessage("batch name must be a string"),
];
