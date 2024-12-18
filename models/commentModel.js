const mongoose=require("mongoose");

const comment=mongoose.Schema({

    comment:{
        type:String,
    },

    createdById:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },

    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"postModel"
    },

},{timestamps:true});

module.exports=mongoose.model("commentModel", comment);