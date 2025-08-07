const { checkTeacherExists } = require("../../repositories/auth");
const { checkExistingBatch, createBatch, updateBatch, deleteBatch } = require("../../repositories/batch")

exports.BatchCreation = async (teacherId,batchName,instructorIds,subjectIds) =>{    
    if(!batchName||!instructorIds||!subjectIds){
        return {
            statusCode:400,
            message:"Something is missing in creating Batch",
            data:null
        }
    }

    let checkTeacher = await checkTeacherExists(teacherId);

    if(checkTeacher==false){
    return {
      data:null,
      message:"Student can't create Batch!",
      statusCode:400
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

exports.BatchUpdation = async (teacherId,batchName,updatedBatch) =>{
    
    
    if(!batchName || !updatedBatch){
        return {
            statusCode:400,
            message:"Batch Name or updatedBatch is missing",
            data:null
        }
    }
    let checkTeacher = await checkTeacherExists(teacherId);

    if(checkTeacher==false){
    return {
      data:null,
      message:"Student can't update Batch!",
      statusCode:400
    }
  }

    let batch = await checkExistingBatch(batchName);

    if(!batch){
        return {
            statusCode:404,
            message:"No batches exists from that name",
            data:null
        }
    }

    batch = await updateBatch(batchName,updatedBatch);

    if(!batch){
        return {
            statusCode:500,
            message:"Internal server Error",
            data:null
        }
    }

    return {
        statusCode:200,
        message:"Batch updated!",
        data:batch
    }
}

exports.BatchDeletion = async (teacherId,batchName) =>{
    if(!batchName){
        return {
            statusCode:404,
            message:"No batches exists from that name",
            data:null
        }
    }
    let checkTeacher = await checkTeacherExists(teacherId);

    if(checkTeacher==false){
    return {
      data:null,
      message:"Student can't delete Batch!",
      statusCode:400
    }
  }

    let batch = await deleteBatch(batchName);
    if(!batch){
        return {
            statusCode:404,
            message:"Batch couldnt be deleted",
            data:null
        }
    }

    return {
        statusCode:200,
        message:"Batch deleted",
        data:batch
    }

}

exports.BatchRead = async(batchName) =>{
    const batch = await checkExistingBatch(batchName);

    if(!batch){
        return {
            data:null,
            message:"Batch not found!",
            statusCode:404
        }
    }    

    return {
        data:batch,
        message:"Batch founded",
        statusCode:200
    }
}