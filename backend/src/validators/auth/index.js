const { body } = require('express-validator');
const { query } = require('express-validator');

exports.validateMobileAndOTP = [
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),

  body('otp')
    .notEmpty()
    .withMessage('OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits'),

  body('username')
    .optional() 
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
    
  body("role").optional() 
    .isString()
    .withMessage('Role must be a string')
];
exports.validateUserSearch = [
  query('phoneNumber')
    .optional()
    .isNumeric()
    .withMessage('Phone number must be a number')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits')
];

exports.validateUserDeletion = [
  body("phoneNumber").isNumeric().withMessage("Phone number must be a number").matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits')
];

exports.validateUserUpdation = [
  body("phoneNumber").isNumeric().withMessage("Phone number must be a number").matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),
  body("phoneNumber")
    .isNumeric()
    .withMessage("Phone number must be a number")
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),

  body("updatedData")
    .isObject()
    .withMessage("updatedData must be an object"),

  // optional fields inside updatedData
  body("updatedData.username")
    .optional()
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),

  body("updatedData.role")
    .optional()
    .isString()
    .withMessage("Role must be a string")
]