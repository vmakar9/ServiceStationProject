import {NextFunction, Request, Response} from "express";
import {adminService} from "../services/admin.service";


class AdminController{
    public async banUser(req:Request,res:Response,next:NextFunction){
        try {
            const {userId} = req.params
            await adminService.banUser(userId)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }

    public async unBanUser(req:Request,res:Response,next:NextFunction){
        try {
            const {userId} =req.params
            await adminService.unBanUser(userId)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }

    public async getAll(req:Request,res:Response,next:NextFunction){
        try {
            const users = await adminService.getAllUser()
            return res.status(200).json(users)
        }catch (e) {
            next(e)
        }
    }

    public async getBanedUser(req:Request,res:Response,next:NextFunction){
        try {
            const users = await adminService.getBanedUsers()
            return res.status(200).json(users)
        }catch (e) {
            next(e)
        }
    }
    
    public async changeRole(req:Request,res:Response,next:NextFunction){
        try {
            const {userId} = req.params
            const {newRole} = req.body
            await adminService.changeRole(userId,newRole)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }

    public async deleteUser(req:Request,res:Response,next:NextFunction){
        try {
            const {userId} = req.params
            await adminService.deleteUser(userId)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }
}

export const adminController = new AdminController()