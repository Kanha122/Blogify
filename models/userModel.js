const mongoose=require("mongoose");

const user=mongoose.Schema({

    fullName:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        unique:true,
        required:true,
    },

    profileImage:{
        type:String,
        default:"/images/default.png"
    }, 

    role:{
        type:String,
        enum:["USER", "ADMIN"],
        default:"USER",
    },
    date:{
        type:Date,
        default: Date.now(),
    },

},{timestamps:true});

module.exports=mongoose.model("userModel", user);