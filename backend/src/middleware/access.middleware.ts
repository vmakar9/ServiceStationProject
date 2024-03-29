import {Request,Response,NextFunction} from "express";
import {ITokenPayload} from "../types/token.type";
import {Requests} from "../models/request.model";
import {ApiError} from "../error/api.error";
import {User} from "../models/user.model";
import {EUserRoles} from "../enum/user-roles.enum";
import {EUserStatus} from "../enum/user-status.enum";

class AccessMiddleware{
    public async getRequestAccess(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {requestId} = req.params
            const {_id,role} = req.res.locals.jwtPayload as ITokenPayload
            const request = await Requests.findById(requestId)
            if(request.creator != _id && role != EUserRoles.admin && role != EUserRoles.moderator){
                throw new ApiError("Access denied",401)
            }
            res.locals.request = request
            next()
        }catch (e) {
            next(e)
        }
    }

    public async getUserStatus(req:Request,res:Response,next:NextFunction){
        try {
          const {_id} = req.res.locals.jwtPayload as ITokenPayload

          const user = await User.findById(_id)

          if(user.status != EUserStatus.active){
              throw new ApiError("Your account is not activated or blocked",401)
          }

          res.locals.user =user
          next()
        }catch (e) {
          next(e)
        }
    }

    public async IsUserAdminOrModerator(req:Request,res:Response,next:NextFunction){
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload
            const user = await User.findById(_id)

            if(user.role == EUserRoles.user){
                throw new ApiError("Access denied",401)
            }
            res.locals.user = user
            next()
        }catch (e) {
            next(e)
        }
    }

    public async IsUserAdmin(req:Request,res:Response,next:NextFunction){
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload
            const user = await User.findById(_id)

            if(user.role != EUserRoles.admin){
                throw new ApiError("Access denied",401)
            }
            res.locals.user = user
            next()
        }catch (e) {
            next(e)
        }
    }
}

export const accessMiddleware = new AccessMiddleware()