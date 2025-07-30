const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    streamName:{type:String,required:true,unique:true},
    batchId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"batch"},
    subjectId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"subject"},
    streamUrl:{type:String,required:true},
    instructorId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"}
},{
    timestamps:true
})

const Stream = mongoose.model("stream",streamSchema);

module.exports={
    Stream
}