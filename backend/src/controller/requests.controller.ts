import {Request,Response,NextFunction} from "express";
import {requestService} from "../services/request.service";
import {ITokenPayload} from "../types/token.type";


class RequestsController{
    public async getAll(req:Request,res:Response,next:NextFunction){
        try {
            const request = await requestService.getAll()
            res.status(200).json(request)
        }catch (e) {
           next(e)
        }
    }
    
    public async create(req:Request,res:Response,next:NextFunction){
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload
            const request = await requestService.create(req.body,_id)
            res.status(201).json(request)
        }catch (e) {
            next(e)
        }
    }

    public async update(req:Request,res:Response,next:NextFunction){
        try {
            const {requestId} = req.params
            const updatedRequest = await requestService.updateRequest(requestId,{...req.body})
            res.status(201).json(updatedRequest)
        }catch (e) {
            next(e)
        }
    }

    public async delete(req:Request,res:Response,next:NextFunction){
        try {
            const {requestId} = req.params
            await requestService.deleteRequest(requestId)
            res.sendStatus(204)
        }catch (e) {
            next(e)
        }
    }

    public async getById(req:Request,res:Response,next:NextFunction){
        try {
            const {requestId} = req.params
            const request = await requestService.getById(requestId)
            return res.status(201).json(request)
        }catch (e) {
            
        }
    }
}

export const requestController = new RequestsController()