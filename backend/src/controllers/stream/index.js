const { StreamCreation, StreamUpdate, StreamDeletion, StreamRead } = require("../../services/stream");
const ApiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

exports.handleStreamCreation = asyncHandler(async (req,res) =>{
    const {streamName,subjectId,streamUrl,instructorId,batchId} = req.body;

    const result = await StreamCreation(streamName,subjectId,streamUrl,instructorId,batchId);

    const {message,statusCode =200,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})


exports.handleStreamUpdation = asyncHandler(async(req,res)=>{
    const {streamName,updatedStream} = req.body;

    const result = await StreamUpdate(streamName,updatedStream);

    const {message,statusCode=200,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleStreamDeletion = asyncHandler(async(req,res)=>{
    const {streamName} = req.body;

    const result = await StreamDeletion(streamName);

    const {message,statusCode=200,data}= result ;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleStreamRead = asyncHandler(async (req, res) => {
  const streamName = req.query.id || null; // optional
  const batchId = req.params.batchId; 

  const result = await StreamRead(streamName, batchId);

  const { message, statusCode = 200, data } = result;

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});
