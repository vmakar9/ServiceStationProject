import {Request,Response,NextFunction} from "express";
import {repairerService} from "../services/repairer.service";

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
}

export const repairerController = new RepairerController()