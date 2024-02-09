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
}

export const repairerController = new RepairerController()