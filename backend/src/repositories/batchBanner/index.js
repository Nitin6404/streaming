const BatchBanner = require("../../models/batchBannerModel");

exports.createBatchBanner = async (batchId)=>{
    return await BatchBanner.create({batchId:batchId});
}

exports.readBatchBanner = async (batchBannerId) =>{
    if(batchBannerId){
        return await BatchBanner.findById(id);
    }else{
        return await BatchBanner.find();
    }
}

exports.updateBatchBanner = async (batchBannerId,updatedData) =>{
    return await BatchBanner.findByIdAndUpdate(batchBannerId,{$set:updatedData},{new:true});
}

exports.deleteBatchBanner = async (batchBannerId)=>{
    return await BatchBanner.findByIdAndDelete(batchBannerId,{new:true});
}