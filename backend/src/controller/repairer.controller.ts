import {Request,Response,NextFunction} from "express";
import {repairerService} from "../services/repairer.service";
import {ITokenRepairPayload} from "../types/token.type";
import {IRepairer} from "../types/repairer.type";

class RepairerController{
    public async createRepairer(req:Request,res:Response,next:NextFunction){
        try {
            await repairerService.createRepaier(req.body)
            res.sendStatus(201)
        }catch (e) {
            next(e)
        }
    }

    public async repairerLogin(req:Request,res:Response,next:NextFunction){
        try {
            const {cooperative_email,cooperative_password} = req.body
            const {repairer} = req.res.locals
            const tokenPair = await repairerService.repairerLogin({cooperative_email,cooperative_password},repairer)
            return res.status(201).json(tokenPair)
        }catch (e) {
            next(e)
        }
    }

    public async refreshRepairer(req:Request,res:Response,next:NextFunction){
        try {
            const {tokenInfo,jwtPayload} = req.res.locals
            const tokenPair = await repairerService.refreshRepairer(tokenInfo,jwtPayload)
            return res.status(201).json(tokenPair)
        }catch (e) {
            next(e)
        }
    }

    public async getRepairerMe(req:Request,res:Response,next:NextFunction){
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenRepairPayload
            const repairer = await repairerService.getRepairerMe(jwtPayload)
            res.json({data:repairer})
        }catch (e) {
            next(e)
        }
    }

    public async updateRepairerMe(req:Request,res:Response,next:NextFunction){
        try {
           const jwtPayload = req.res.locals.jwtPayload as ITokenRepairPayload
           const body = req.body as Partial<IRepairer>

           const repairer = await repairerService.updateRepairer(jwtPayload,body)
           res.status(201).json(repairer)
        }catch (e) {
            next(e)
        }
    }

}

export const repairerController = new RepairerController()