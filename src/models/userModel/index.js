const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    role:{type:String,enum:["student","admin","teacher"],required:true,default:"student"}
})

const User = mongoose.model("user",userSchema);

module.exports={User}