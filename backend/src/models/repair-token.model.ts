import {model, Schema, Types} from "mongoose";
import {Repairer} from "./repairer.model";

const repairTokenSchema = new Schema({
    _repair_id:{
      type:Types.ObjectId,
      required:true,
      ref:Repairer
    },
    accessRepairToken:{
        type:String,
        required:true
    },
    refreshRepairToken:{
        type:String,
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})

export const RepairToken = model('repair token',repairTokenSchema)