import {User} from "../models/user.model";
import {EUserStatus} from "../enum/user-status.enum";
import {ApiError} from "../error/api.error";
import {IUser} from "../types/user.type";

class ModeratorService{
    public async banUser(userId:string):Promise<void>{
        try {
            await Promise.all([
                User.updateOne(
                    {_id:userId},
                    {$set:{status:EUserStatus.blocked}}),
            ])
        }catch (e) {
            throw new ApiError(e.error,e.status)
        }
    }

    public async unBanUser(userId:string):Promise<void>{
        try {
            await Promise.all([
                User.updateOne(
                    {_id:userId},
                    {$set:{status:EUserStatus.active}}
                )
            ])
        }catch (e) {
            throw new ApiError(e.error,e.status)
        }
    }

    public async getAllUser():Promise<IUser[]>{
        try {
            return User.find()
        }catch (e) {
            throw new ApiError(e.error,e.status)
        }
    }

    public async getBanedUsers():Promise<IUser[]>{
        try {
            return User.find({status:EUserStatus.blocked})
        }catch (e) {
            throw new ApiError(e.error,e.status)
        }
    }
}

export const moderatorServices = new ModeratorService()