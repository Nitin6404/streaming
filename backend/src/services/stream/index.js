const { checkTeacherExists } = require("../../repositories/auth");
const { checkExistingStream, createStream, updateStream, deleteStream, readAllStream } = require("../../repositories/stream")

exports.StreamCreation = async (teacherId,streamName,subjectId,streamUrl,instructorId,batchId) =>{
    if(!streamName||!subjectId||!instructorId||!batchId){
        return {
            statusCode : 400,
            message:"Required fields are missing",
            data :null
        }
    }

    let checkTeacher = await checkTeacherExists(teacherId);
    
        if(checkTeacher==false){
        return {
          data:null,
          message:"Student can't create stream!",
          statusCode:400
        }
      }

    let stream = await checkExistingStream(streamName);
    
    if(stream){
        return {
            statuCode :409,
            message:"Stream already exists",
            data:null
        }
    }

    stream = await createStream(streamName,subjectId,streamUrl,instructorId,batchId);
    
    
    if(!stream){
        return {
            statusCode:400,
            message:"Something went Wrong in Stream creation",
            data:null
        }
    }

    return {
        statusCode:201,
        message:"Stream Created",
        data:stream
    }
}

exports.StreamUpdate = async (teacherId,streamName,updatedStream) =>{
    if(!streamName ||!updatedStream){
        return {
            statusCode:400,
            message:"Required fields are missing",
            data:null
        }
    }

    let checkTeacher = await checkTeacherExists(teacherId);
    
        if(checkTeacher==false){
        return {
          data:null,
          message:"Student can't update stream!",
          statusCode:400
        }
      }

    let stream = await updateStream(streamName,updatedStream);

    if(!stream){

        return {
            statusCode:400,
            message:"Something went Wrong in Stream Updation",
            data:null
        }

    }

    return {
        statusCode:201,
        message:"Stream Updated",
        data:stream
    }
}

exports.StreamDeletion = async (teacherId,streamName) =>{
    if(!streamName){
        return {
            statusCode:400,
            message:"Required fields are missing",
            data:null
        }
    }
    let checkTeacher = await checkTeacherExists(teacherId);
    
        if(checkTeacher==false){
        return {
          data:null,
          message:"Student can't delete stream!",
          statusCode:400
        }
      }

    const stream = await deleteStream(streamName);

    if(!streamName){
        return {
            statusCode:400,
            message:"Something went wrong",
            data:null
        }
    }


    return { 
        statusCode :200,
        message:"Stream Deleted",
        data:stream
    }
}

exports.StreamRead = async (streamName, batchId) => {
  const stream = await readAllStream(batchId, streamName);

  if (!stream || (Array.isArray(stream) && stream.length === 0)) {
    return {
      statusCode: 404,
      message: "Stream not found",
      data: null,
    };
  }

  return {
    statusCode: 200,
    message: "Streams Found",
    data: stream,
  };
};