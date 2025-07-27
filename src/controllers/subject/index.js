const { createSubject } = require("../../services/subject");
const ApiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");


// controller

exports.handleSubjectCreation = asyncHandler(async(req,res)=>{
    const {subjectName,code} = req.body;

    const result = await createSubject(subjectName,code);

    const {message,data,statusCode = 200} = result;


    return res.status(200).json(new ApiResponse(statusCode, data, message));

})