const {body} = require("express-validator");

exports.validateSubjectCreationAndEditing = [
    body("subjectName").notEmpty().withMessage("Subject name is missing")
,
    body("code").notEmpty().withMessage("Code is required for Subject").isLength({min:3,max:10}).withMessage("Subject Code must be 3 letter"),
    body("streamSessions")
]