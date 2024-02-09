import {IRepairer} from "../types/repairer.type";
import {passwordService} from "./password.service";
import {Repairer} from "../models/repairer.model";
import {ApiError} from "../error/api.error";

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
}

export const repairerService = new RepairerService()