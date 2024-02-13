import {IRepairer} from "../types/repairer.type";
import {passwordService} from "./password.service";
import {Repairer} from "../models/repairer.model";
import {ApiError} from "../error/api.error";
import {IRepairerCredentials} from "../types/auth.type";
import {ITokenRepairPair, ITokenRepairPayload} from "../types/token.type";
import {tokenService} from "./token.service";
import {RepairToken} from "../models/repair-token.model";

class RepairerService{
    public async createRepaier(body:IRepairer):Promise<void>{
        try {
            const {cooperative_password} = body
            const hashedPassword = await passwordService.hash(cooperative_password)
            await Repairer.create({...body,cooperative_password:hashedPassword})
        }catch (e) {
            throw new ApiError(e.error,e.message)
        }
    }

    public async repairerLogin(credentials:IRepairerCredentials,repairer:IRepairer):Promise<ITokenRepairPair>{
        try {
            const isMatched = await passwordService.compare(
                credentials.cooperative_password,
                repairer.cooperative_password
            )
            if(!isMatched){
                throw new ApiError("Invalid email or password",409)
            }
            const tokenPair = tokenService.generateRepeirToken({
                _id:repairer._id,
                speciality:repairer.speciality
            })

            await RepairToken.create({
                _repair_id:repairer._id,
                ...tokenPair
            })
            return tokenPair
        }catch (e) {
           throw new ApiError(e.error,e.message)
        }
    }

    public async refreshRepairer(tokenInfo:ITokenRepairPair,jwtPayload:ITokenRepairPayload):Promise<ITokenRepairPair>{
        try {
            const tokenPair = tokenService.generateRepeirToken({
                _id:jwtPayload._id,
                speciality:jwtPayload.speciality
            })
            await Promise.all([
                RepairToken.create({_repair_id:jwtPayload._id,...tokenPair}),
                RepairToken.deleteOne({refreshRepairToken: tokenInfo.refreshRepairToken})
            ])

            return tokenPair
        }catch (e) {
            throw new ApiError(e.error,e.message)
        }
    }

    public async getRepairerMe(jwtPayload:ITokenRepairPayload):Promise<IRepairer>{
        try {
            const repairer = await Repairer.findOne({_id:jwtPayload._id})
            if(!repairer){
                throw new ApiError("You cannot get this repairer",403)
            }
            return repairer
        }catch (e) {
            throw new ApiError(e.error,e.message)
        }
    }

    public async updateRepairer(jwtPayload:ITokenRepairPayload,body:Partial<IRepairer>):Promise<IRepairer>{
        try {
            const repairer = await Repairer.findOne({_id:jwtPayload._id})
            if(!repairer){
                throw new ApiError("You cannot get this repairer",403)
            }
           return  Repairer.findByIdAndUpdate(jwtPayload._id,body,{returnDocument:"after"})
        }catch (e) {
            throw new ApiError(e.error,e.message)
        }
    }


}

export const repairerService = new RepairerService()