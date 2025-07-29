const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    batchName:{type:String,required:true,unique:true},
    subjectIds:{type:[mongoose.Schema.Types.ObjectId],ref:"subject",required:true},
    instructorIds:{type:[mongoose.Schema.Types.ObjectId],ref:"user",required:true},
    studentsIds:{type:[mongoose.Schema.Types.ObjectId],ref:"user",default:[]},
},{
    timestamps:true
})

const Batch = mongoose.model("batch",batchSchema);

module.exports={Batch};