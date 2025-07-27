const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subjectName:{type:String,required:true},
    code:{type:String,required:true},
    streamSessions:{type:mongoose.Schema.Types.ObjectId,ref:"stream"},
})

const Subject = mongoose.model("subject",subjectSchema);

module.exports={Subject}