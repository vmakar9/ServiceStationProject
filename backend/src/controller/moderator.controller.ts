import {Request,Response,NextFunction} from "express";
import {moderatorServices} from "../services/moderator.service";

class ModeratorController{
    public async banUser(req:Request,res:Response,next:NextFunction){
        try {
            const {userId} = req.params
            await moderatorServices.banUser(userId)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }

    public async unBanUser(req:Request,res:Response,next:NextFunction){
        try {
            const {userId} =req.params
            await moderatorServices.unBanUser(userId)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }
    
    public async getAll(req:Request,res:Response,next:NextFunction){
        try {
            const users = await moderatorServices.getAllUser()
            return res.status(200).json(users)
        }catch (e) {
            next(e)
        }
    }
    
    public async getBanedUser(req:Request,res:Response,next:NextFunction){
        try {
            const users = await moderatorServices.getBanedUsers()
            return res.status(200).json(users)
        }catch (e) {
            next(e)
        }
    }

}

export const moderatorController = new ModeratorController()