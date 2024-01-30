import {Schema, Types,model} from "mongoose";
import {User} from "./user.model";
import {EActionTokenType} from "../enum/action-token-type";

const actoionTokenSchema = new Schema({
    _user_id:{
        type: Types.ObjectId,
        required:true,
        ref:User
    },
    actionToken:{
        type:String,
        required:true,
    },
    tokenType:{
        type:String,
        enum:EActionTokenType
    }
},
    {versionKey:false,
            timeStamps:true}
)

export const Action = model("Action", actoionTokenSchema)