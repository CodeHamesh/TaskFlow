
const mongoose = require('mongoose');

let {Schema} = mongoose;

let userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tasks:[{title:{type:String,required:true},task:{type:String},Time:{type:Date,default:Date.now}}]
})

module.exports = mongoose.model("User", userSchema)