const { Stream } = require("../../models/streamModel")

exports.checkExistingStream = async (streamName) =>{
    return await Stream.findOne({streamName});
}

exports.createStream = async (streamName,subjectId,streamUrl,instructorId,batchId) =>{
    try {
        return await Stream.create({streamName,subjectId,streamUrl,instructorId,batchId});
    } catch (error) {
        console.error(error);

    }
}

exports.updateStream = async (streamName,updatedStream) =>{
    try {
        return await Stream.findOneAndUpdate({streamName},updatedStream,{new:true});
    } catch (error) {
        console.error(error);
    }
}

exports.deleteStream= async(streamName) =>{
    return await Stream.findOneAndDelete({streamName});
}

exports.readAllStream = async (batchId,streamName) =>{
    if(!streamName){
        return await Stream.find({batchId});
    }else{
        return await Stream.findOne({batchId,streamName});
    }
};


