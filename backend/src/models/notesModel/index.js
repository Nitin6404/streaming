const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    notesTitle :{type:String,required:true,unique:true},
    notesUrl:{type:String,required:true},
    subjectId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"subject"},
    streamId: { type: mongoose.Schema.Types.ObjectId, ref: "stream", required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  
},{timestamps:true});

const Note = mongoose.model("note",notesSchema);

module.exports={Note};
