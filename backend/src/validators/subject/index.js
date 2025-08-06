const { body } = require("express-validator");

exports.validateSubjectCreationAndEditing = [
  body("subjectName").notEmpty().withMessage("Subject name is missing"),
  body("code")
    .notEmpty()
    .withMessage("Code is required for Subject")
    .isLength({ min: 3, max: 10 })
    .withMessage("Subject Code must be 3 letter"),
  body("streamSessions"),
];

const { query } = require("express-validator");

exports.validateReadSubject = [
  query("subjectName")
    .optional()
    .isString()
    .withMessage("Subject name must be a string"),

  query("code")
    .optional()
    .isString()
    .withMessage("Code must be a string"),
];

