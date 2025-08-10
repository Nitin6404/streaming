const { createSubject, deleteExistingSubject, readExistingSubject } = require("../../services/subject");
const ApiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { updateExistingSubject } = require("../../services/subject");


// controller/subject/index.js

exports.handleSubjectCreation = asyncHandler(async(req,res)=>{
    const {subjectName,code,teacherId} = req.body;

    const result = await createSubject(teacherId,subjectName,code);

    const {message,data,statusCode = 200} = result;


    return res.status(200).json(new ApiResponse(statusCode, data, message));

});


exports.handleUpdateSubject = asyncHandler(async (req, res) => {
  const {teacherId, subjectName, code, updatedSubject } = req.body;

  const result = await updateExistingSubject(teacherId,subjectName, code, updatedSubject);
  const { message, data, statusCode = 200 } = result;

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleSubjectDeletion = asyncHandler(async(req,res)=>{
    const {teacherId,subjectName,code} = req.body;

    const result = await deleteExistingSubject(teacherId,subjectName,code);

    const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message))
})

exports.handleSubjectRead = asyncHandler(async(req,res)=>{
  const {subjectName,code}=req.query;

  const result = await readExistingSubject(subjectName,code);

  const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message))
})