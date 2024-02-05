import {model, Schema, Types} from "mongoose";
import {ERequestStatus} from "../enum/request-status.enum";
import {User} from "./user.model";

const requestSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    car_brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    problem:{
        type:String,
        required:true
    },
    additional_information:{
       type:String,
    },
    status:{
       type:String,
       enum:ERequestStatus,
       default:ERequestStatus.active
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    creator:{
        type:Types.ObjectId,
        ref:User,
        required:true
    }
},
    {
        versionKey:false,
        timeStamps:true
    })

export const Requests = model("request",requestSchema)