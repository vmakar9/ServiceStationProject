import {Request,Response,NextFunction} from "express";
import {Requests} from "../models/request.model";
import {ApiError} from "../error/api.error";

class RequestMiddleware{
    public async getByIdOrThrow(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {requestId} = req.params

            const request = await Requests.findById(requestId)

            if(!request){
                throw new ApiError("Request not found",422)
            }
            req.res.locals = request
            next()
        }catch (e) {
            next(e)
        }
    }
}

export const requestMiddleware = new RequestMiddleware()