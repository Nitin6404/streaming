const { createSubject, deleteExistingSubject } = require("../../services/subject");
const ApiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { updateExistingSubject } = require("../../services/subject");


// controller

exports.handleSubjectCreation = asyncHandler(async(req,res)=>{
    const {subjectName,code} = req.body;

    const result = await createSubject(subjectName,code);

    const {message,data,statusCode = 200} = result;


    return res.status(200).json(new ApiResponse(statusCode, data, message));

});


exports.handleUpdateSubject = asyncHandler(async (req, res) => {
  const { subjectName, code, updatedSubject } = req.body;

  const result = await updateExistingSubject(subjectName, code, updatedSubject);
  const { message, data, statusCode = 200 } = result;

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleSubjectDeletion = asyncHandler(async(req,res)=>{
    const {subjectName,code} = req.body;

    const result = await deleteExistingSubject(subjectName,code);

    const {message,statusCode=200,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message))
})