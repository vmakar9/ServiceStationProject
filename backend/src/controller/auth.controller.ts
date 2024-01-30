import {Request,Response,NextFunction} from "express";
import {authService} from "../services/auth.service";
import {ITokenPayload} from "../types/token.type";

class AuthController{
    public async register(req:Request,res:Response,next:NextFunction){
        try {
            await authService.register(req.body)
            res.sendStatus(201)
        }catch (e) {
            next(e)
        }
    }

    public async login(req:Request,res:Response,next:NextFunction){
        try {
            const {email, password} = req.body
            const {user} = req.res.locals
            const tokenPair = await authService.login({email,password},user)
            return res.status(201).json(tokenPair)
        }catch (e) {
            next(e)
        }
    }

    public async refresh(req:Request,res:Response,next:NextFunction){
        try {
            const {tokenInfo, jwtPayload} = req.res.locals
            const tokenPair = await authService.refresh(tokenInfo,jwtPayload)
            return res.status(200).json(tokenPair)
        }catch (e) {
            next(e)
        }
    }

    public async changePassword(req:Request,res:Response,next:NextFunction){
        try {
            const {tokenInfo} = req.res.locals
            const {oldPassword,newPassword} = req.body

            await authService.changePassword(
                tokenInfo._user_id,
                oldPassword,
                newPassword
            )
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }

    public async forgotPassword(req:Request,res:Response,next:NextFunction){
        try {
            const {user} = req.res.locals
            await authService.forgotPassword(user)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }

    public async setForgotPassword(req:Request,res:Response,next:NextFunction){
        try {
            const {password}= req.body
            const {tokenInfo} = req.res.locals

            await authService.setForgotPassword(password,tokenInfo._user_id,req.params.token)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }

    public async sendActivationToken(req:Request,res:Response,next:NextFunction){
        try {
            const {user} = req.res.locals
            await authService.sendActivateToken(user)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }

    public async activate(req:Request,res:Response,next:NextFunction){
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload
            await authService.activate(_id)
            res.sendStatus(200)
        }catch (e) {
            next(e)
        }
    }
}

export const authController = new AuthController()