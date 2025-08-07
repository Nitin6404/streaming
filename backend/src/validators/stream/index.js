
const { body, param,query } = require("express-validator");

exports.validateStreamCreation = [
  body("streamName")
    .notEmpty()
    .withMessage("Stream name is required"),

  body("subjectId")
    .notEmpty()
    .withMessage("Subject ID is required"),

  body("streamUrl")
    .notEmpty()
    .withMessage("Stream URL is required")
    .isURL()
    .withMessage("Stream URL must be valid"),

  body("instructorId")
    .notEmpty()
    .withMessage("Instructor ID is required"),

    body("batchId").notEmpty().withMessage("Batch is required"),
    body("teacherId")
  .notEmpty()
  .withMessage("Teacher ID is required")
  .isMongoId()
  .withMessage("Invalid Teacher ID")
];

exports.validateStreamUpdation = [
  body("streamName")
    .notEmpty()
    .withMessage("Stream name to update is required"),

  body("updatedStream")
    .notEmpty()
    .isObject()
    .withMessage("Updated stream data must be provided and be an object"),
    body("teacherId")
  .notEmpty()
  .withMessage("Teacher ID is required")
  .isMongoId()
  .withMessage("Invalid Teacher ID")
];

exports.validateStreamDeletion = [
  body("streamName")
    .notEmpty()
    .withMessage("Stream name is required for deletion"),
    body("teacherId")
  .notEmpty()
  .withMessage("Teacher ID is required")
  .isMongoId()
  .withMessage("Invalid Teacher ID")
];



exports.validateStreamRead = [
  param("batchId")
    .notEmpty()
    .withMessage("Batch ID is required"),

  query("id")
    .optional()
    .isString()
    .withMessage("Stream name (id) must be a string"),
];

