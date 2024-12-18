const mongoose=require("mongoose");

const post=mongoose.Schema({

    title:{
        type:String,
        required:true,
    },

    meaning:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
        unique:true,
    },

    postImage:{
        type:String,
    }, 
    
    createdById:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    }

},{timestamps:true});

module.exports=mongoose.model("postModel", post);