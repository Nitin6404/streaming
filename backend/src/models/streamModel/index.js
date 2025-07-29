const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
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