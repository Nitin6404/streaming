const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    phoneNumber:{type:Number,required:true}
})

const User = mongoose.model("user",userSchema);

module.exports={User}