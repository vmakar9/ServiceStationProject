import {model, Schema} from "mongoose";

const repeirerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true
    },
    cooperative_email:{
        type:String,
        required:true
    },
    cooperative_password:{
        type:String,
        required:true
    }
},
    {
        versionKey:false,
        timestamps:true
    })

export const Repairer = model('repairer',repeirerSchema)