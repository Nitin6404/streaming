const { BatchBannerCreation, BatchBannerRead, BatchBannerUpdation, BatchBannerDelete } = require('../../services/batchBanner');
const ApiResponse = require('../../utils/apiResponse');
const { asyncHandler } = require('../../utils/asyncHandler/index');
exports.handleBatchBannerCreation = asyncHandler (async(req,res)=>{
    const {batchId} = req.body;

    const result = await BatchBannerCreation(batchId);

    const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));

})
exports.handleBatchBannerRead = asyncHandler (async(req,res)=>{
    const {batchBannerId} = req.body;

    const result = await BatchBannerRead(batchBannerId);

    const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));

})
exports.handleBatchBannerUpdation = asyncHandler (async(req,res)=>{
    const {batchBannerId,updatedData} = req.body;

    const result = await BatchBannerUpdation(batchBannerId,updatedData);

    const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));

})
exports.handleBatchBannerDeletion = asyncHandler (async(req,res)=>{
    const {batchBannerId} = req.body;

    const result = await BatchBannerDelete(batchBannerId);

    const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));

})