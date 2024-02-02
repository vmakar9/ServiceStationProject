import {ITokenPayload} from "../types/token.type";
import {IUser} from "../types/user.type";
import {User} from "../models/user.model";
import { ApiError } from "../error/api.error";
import {Token} from "../models/token.model";

class UserService{
    public async getMe(jwtPayload:ITokenPayload):Promise<IUser>{
            const user = await User.findOne({_id:jwtPayload._id})
            if(!user){
                throw new ApiError("You cant get this user", 403);
            }
            return user
    }

    public async updateMe(jwtPayload:ITokenPayload,body:Partial<IUser>):Promise<IUser>{
        const user = await User.findOne({_id:jwtPayload._id})
        if(!user){
            throw  new ApiError("User not found",404)
        }
        return User.findByIdAndUpdate(jwtPayload._id, body, {returnDocument: "after"});
    }

    public async deleteMe(jwtPayload:ITokenPayload):Promise<void>{
        const user = await User.findOne({_id:jwtPayload._id})
        if(!user){
            throw new ApiError("User not found",404)
        }
        await Promise.all([
            User.findByIdAndDelete({_id:jwtPayload._id}),
            Token.deleteMany({_userId:jwtPayload._id})
        ])
    }
    
}

export const userService = new UserService()