const mongoose=require('mongoose');

const JobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:'Full-Time'
    },
    status:{
        type:String,
        default:'Active'
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    applicants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Job',JobSchema);