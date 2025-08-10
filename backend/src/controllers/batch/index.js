const { BatchCreation, BatchUpdation, BatchDeletion, BatchRead } = require("../../services/batch");
const ApiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

exports.handleBatchCreation = asyncHandler(async(req,res)=>{
    const {teacherId,batchName,instructorIds,subjectIds} = req.body;

    const result = await BatchCreation(teacherId,batchName,instructorIds,subjectIds);

    const {message,data,statusCode = 200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleBatchUpdation = asyncHandler(async(req,res)=>{
    const {teacherId,batchName,updatedBatch} = req.body;    

    const result = await BatchUpdation(teacherId,batchName,updatedBatch);

   const {message,data,statusCode = 200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleBatchDeletion = asyncHandler(async(req,res)=>{
    const {teacherId,batchName} = req.body;

    const result = await BatchDeletion(teacherId,batchName);

    const {message,data,statusCode = 200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleBatchRead = asyncHandler(async(req,res)=>{
    const {batchName} = req.query;

    const result = await BatchRead(batchName);
    const {message,data,statusCode = 200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
    
})

