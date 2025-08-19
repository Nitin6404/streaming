const { createBatchBanner, readBatchBanner, updateBatchBanner, deleteBatchBanner } = require("../../repositories/batchBanner")

exports.BatchBannerCreation = async (batchBanner)=>{
    if(!batchBanner){
        return {
            data:null,
            message:"required fields are missing",
            statusCode:400
        }
    }

    let BatchBanner = await createBatchBanner(batchBanner);

    if(!BatchBanner){
        return {
            data:null,
            message:"Something went wrong",
            statusCode:400
        }
    }

    return {
        data:BatchBanner,
        message:"Batch Banner is created",
        statusCode:201
    }
}

exports.BatchBannerRead = async (batchBannerId)=>{
    let BatchBanner = await readBatchBanner(batchBannerId);

    return {
        data:BatchBanner,
        message:"Fetched Batch banners",
        statusCode:200
    }
}

exports.BatchBannerUpdation = async (batchBannerId,updatedData)=>{

    if(!batchBannerId||!updatedData){
        return {
            data:null,
            message:"required fields are missing ",
            statusCode:400
        }
    }

    let batchBanner = await updateBatchBanner(batchBannerId,updatedData);

    if(!batchBanner){
        return {
            data:null,
            message:"Something went wrong",
            statusCode:400
        }
    }

    return {
        data:batchBanner,
        message:"Batch banner is updated",
        statusCode:200
    }
}

exports.BatchBannerDelete = async (batchBannerId)=>{
    if(!batchBannerId){
        return {
            data:null,
            message:"required fields are missing",
            statusCode:400
        }
    }

    let batchBanner = await deleteBatchBanner(batchBannerId);

    if(!batchBanner){
        return {
            data:null,
            message:"Something went wrong",
            statusCode:400
        }
    }

    return {
        data:batchBanner,
        message:"batch banner is deleted",
        statusCode:200
    }
}