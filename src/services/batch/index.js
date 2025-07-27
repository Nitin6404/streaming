const { checkExistingBatch, createBatch } = require("../../repositories/batch")

exports.BatchCreation = async (batchName,instructorIds,subjectIds) =>{
    if(!batchName||!instructorIds||!subjectIds){
        return {
            statusCode:400,
            message:"Something is missing in creating Batch",
            data:null
        }
    }

    let batch = await checkExistingBatch(batchName);

    if(batch){
        return {
            statusCode:409,
            message:"Batch already exists",
            data:null
        }
    }

    batch = await createBatch(batchName,subjectIds,instructorIds);

    if(!batch){
        return {
            statusCode:400,
            message:"Something went Wrong in batch creation",
            data:null
        }
    }

    return {
        statusCode:201,
        message:"Batch Created",
        data:batch
    }
}