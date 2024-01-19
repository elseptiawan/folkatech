const mongoose = require('mongoose');

const user = mongoose.Schema({
    userName:{
        required:true,
        type:String,
        unique:true
    },
    accountNumber:{
        required:true,
        type:Number,
        unique:true,
        index:true
    },
    emailAddress:{
        required:true,
        type:String,
        unique:true
    },
    identityNumber:{
        required:true,
        type:Number,
        unique:true,
        index:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("User", user);