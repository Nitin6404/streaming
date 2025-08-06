const { BatchCreation, BatchUpdation, BatchDeletion, BatchRead } = require("../../services/batch");
const ApiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

exports.handleBatchCreation = asyncHandler(async(req,res)=>{
    const {batchName,instructorIds,subjectIds} = req.body;

    const result = await BatchCreation(batchName,instructorIds,subjectIds);

    const {message,data,statusCode = 200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleBatchUpdation = asyncHandler(async(req,res)=>{
    const {batchName,updatedBatch} = req.body;    

    const result = await BatchUpdation(batchName,updatedBatch);

   const {message,data,statusCode = 200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleBatchDeletion = asyncHandler(async(req,res)=>{
    const {batchName} = req.body;

    const result = await BatchDeletion(batchName);

    const {message,data,statusCode = 200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleBatchRead = asyncHandler(async(req,res)=>{
    const {batchName} = req.query;

    const result = await BatchRead(batchName);
    const {message,data,statusCode = 200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
    
})

