import {Schema,model} from "mongoose"
import {EUserStatus} from "../enum/user-status.enum";
import {EUserRoles} from "../enum/user-roles.enum";

const userSchema = new Schema({
   name:{
       type:String,
       required:true
   },
   surname:{
       type:String,
       required:true
   },
   email:{
       type:String,
       unique:true,
       required:[true,"Email is required"],
       trim:true,
       lowercase:true
   },
   password:{
       type:String,
       required:[true,"Password is required"]
   },
   status:{
       type:String,
       default:EUserStatus.inactive,
       enum:EUserStatus
   },
   role:{
       type:String,
       default:EUserRoles.user,
       enum:EUserRoles
   }

},
    {
        versionKey:false,
        timestamps:true
    })

export const User = model('user',userSchema)