import {IRequest} from "../types/request.type";
import {Requests} from "../models/request.model";
import {Types} from "mongoose";
import {ApiError} from "../error/api.error";

class RequestService{
    public async create(data:IRequest,creatorId:string){
        try {
             await Requests.create({...data, creator: new Types.ObjectId(creatorId)})
        }catch (e) {
            throw new ApiError(e.error,e.status)
        }
    }

    public async getAll():Promise<IRequest[]>{
        try {
            return Requests.find()
        }catch (e) {
            throw new ApiError(e.error,e.status)
        }
    }

    public async getById(requestId:string):Promise<IRequest>{
        try {
            return Requests.findById(requestId)
        }catch (e) {
            throw new ApiError(e.error,e.status)
        }
    }
    
    public async updateRequest(requestId:string,body:Partial<IRequest>):Promise<IRequest>{
        try {
            return Requests.findByIdAndUpdate(requestId,body,{returnDocument:"after"})
        }catch (e) {
            throw new ApiError(e.error,e.status)
        }
    }

    public async deleteRequest(requestId:string):Promise<void>{
        try {
            await Requests.findByIdAndDelete({_id:requestId})
        }catch (e) {
            throw new ApiError(e.error,e.status)
        }
    }
}

export const requestService = new RequestService()