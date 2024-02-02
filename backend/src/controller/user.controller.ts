import {Request,Response,NextFunction} from "express";
import {ITokenPayload} from "../types/token.type";
import {userService} from "../services/user.service";
import {IUser} from "../types/user.type";

class UserController{
    public async getMe(req:Request,res:Response,next:NextFunction){
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const user = await userService.getMe(jwtPayload)
            res.json({data:user})
        }catch (e) {
            next(e)
        }
    }

    public async updateMe(req:Request,res:Response,next:NextFunction){
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload
            const body = req.body as Partial<IUser>

            const user = await userService.updateMe(jwtPayload,body)

            res.status(201).json(user)
        }catch (e) {
            next(e)
        }
    }
    
    public async deleteMe(req:Request,res:Response,next:NextFunction){
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload

            await userService.deleteMe(jwtPayload)

            res.sendStatus(204)
        }catch (e) {
            next(e)
        }
    }
}

export const userController =new UserController()