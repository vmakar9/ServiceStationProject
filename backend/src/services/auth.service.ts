import {IUser} from "../types/user.type";
import {passwordService} from "./password.service";
import {User} from "../models/user.model";
import {emailService} from "./email.service";
import {EEmailAction} from "../enum/email.enum";
import {ApiError} from "../error/api.error";
import {ICredentials} from "../types/auth.type";
import {ITokenPair, ITokenPayload} from "../types/token.type";
import {tokenService} from "./token.service";
import {Token} from "../models/token.model";
import {EUserRoles} from "../enum/user-roles.enum";
import {EActionTokenType} from "../enum/action-token-type";
import {Action} from "../models/action.model";
import {OldPassword} from "../models/oldpassoword.model";
import {EUserStatus} from "../enum/user-status.enum";


class AuthService{
    public async register(body:IUser):Promise<void>{
        try {
            const {password} = body
            const hashedPassword = await passwordService.hash(password)
            await User.create({...body,password:hashedPassword});
            await Promise.all([
                emailService.sendEmail(body.email,EEmailAction.WELCOME)
            ])
        }catch (e) {
            throw  new ApiError(e.message,e.status)
        }
    }

    public async login(credentials:ICredentials,user:IUser):Promise<ITokenPair>{
        try {
            const isMatched = await passwordService.compare(
                credentials.password,
                user.password
            )
            if(!isMatched){
                throw new ApiError("Invalid email or password",409)
            }

            const tokenPair = tokenService.generateTokenPair({
                _id:user._id,
                role:user.role
            })

            await Token.create({
                _user_id:user._id,
                ...tokenPair
            })
            return tokenPair
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

    public async refresh(tokenInfo:ITokenPair,jwtPayload:ITokenPayload):Promise<ITokenPair>{
        try {
            const tokenPair = tokenService.generateTokenPair({
                _id:jwtPayload._id,
                role:jwtPayload.role
            })
            await Promise.all([
                Token.create({_user_id:jwtPayload._id,...tokenPair}),
                Token.deleteOne({refreshToken:tokenInfo.refreshToken})
            ])
            return tokenPair
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

    public async forgotPassword(user:IUser):Promise<void>{
        try {
            const actionToken = tokenService.generateActionToken(
                {_id: user._id,role:EUserRoles.user},
                EActionTokenType.forgot
            )

            await Action.create({
                actionToken,
                tokenType:EActionTokenType.forgot,
                _user_id:user._id
            })

            await emailService.sendEmail(user.email,EEmailAction.FORGOT_PASSWORD,{
                token:actionToken
            });
            await OldPassword.create({_user_id: user._id,password: user.password})
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

    public async setForgotPassword(password:string,id:string,token:string):Promise<void>{
        try {
            const hashedPassword = await passwordService.hash(password)
            await User.updateOne({_id:id},{password: hashedPassword})
            await Action.deleteOne({
                actionToken: token,
                tokenType: EActionTokenType.forgot
            })
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

   public async changePassword(userId:string,oldPassword:string,newPassword:string):Promise<void>{
        try {
            const user = await User.findById(userId);
            const isMatched = await passwordService.compare(oldPassword, user.password)
            if(!isMatched){
                throw new ApiError("Wrong old password",400)
            }
            const hashedNewPassword = await passwordService.hash(newPassword)
            await User.updateOne({_id:user._id},{password:hashedNewPassword})
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
   }

   public async sendActivateToken(user:IUser):Promise<void>{
        try {
            const actionToken = tokenService.generateActionToken(
                {_id:user._id,role:EUserRoles.user},
                EActionTokenType.activate
            )
            await Action.create({
                actionToken,
                tokenType: EActionTokenType.activate,
                _user_id: user._id
            })
            await emailService.sendEmail(user.email, EEmailAction.ACTIVATE,{
                token:actionToken
            })
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
   }

   public async activate(userId:string) {
       try {
           await Promise.all([
               User.updateOne(
                   {_id:userId},
                   {$set:{status: EUserStatus.active}}
               ),
               Token.deleteMany({
                   _user_id:userId,
                   tokenType: EActionTokenType.activate
               })
           ])
       }catch (e) {
           throw new ApiError(e.message,e.status)
       }
   }

}

export const authService = new AuthService()