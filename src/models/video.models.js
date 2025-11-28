import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongooseAggregatePaginate"




const videoSchema = new Schema(
{
    videoFiles:{
        type:String,  // cloudinary url
        required:true,
    },
    thumbnail:{
        type:String, //cloudinary url
        required:true,
    },
    title:{
        type:String, 
        required:true,
    },
    description:{
        type:String, 
        required:true,
    },
    duration:{
        type:Number, //cloudinary url
        required:true,
    },
    view:{
        type:Number, //cloudinary url
        default:0,
        require:true,
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }

},
{
    timestamps:true,
})

videoSchema.plugin(mongooseAggregatePaginate) 

export const Video = mongoose.model("Video",videoSchema)