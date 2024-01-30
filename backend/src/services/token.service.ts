import {IActionTokenPayload, ITokenPair, ITokenPayload} from "../types/token.type";
import * as jwt from "jsonwebtoken"
import {configs} from "../configs/config";
import {ETokenType} from "../enum/token.enum";
import {ApiError} from "../error/api.error";
import {EActionTokenType} from "../enum/action-token-type";

class TokenService{
    public generateTokenPair(payload:ITokenPayload):ITokenPair{
        const accessToken = jwt.sign(payload,configs.JWT_ACCESS_SECRET,{
            expiresIn:"1h"
        });
        const refreshToken = jwt.sign(payload,configs.JWT_REFRESH_SECRET,{
            expiresIn:"30d"
        })
        return {
            accessToken,refreshToken
        }
    }

    public checkToken(token:string,tokenType = ETokenType.access):ITokenPayload{

        try {
            let secret = ""
            switch (tokenType) {
                case ETokenType.access:
                    secret = configs.JWT_ACCESS_SECRET
                    break
                case ETokenType.refresh:
                    secret = configs.JWT_REFRESH_SECRET
                    break
            }
            return jwt.verify(token,secret) as ITokenPayload;
        }catch (e) {
            throw new ApiError("Token not valid",401)
        }
    }

    public generateActionToken(payload:IActionTokenPayload,tokenType:EActionTokenType){
           let secret = ""
           switch (tokenType){
               case EActionTokenType.activate:
                   secret = configs.JWT_ACTIVATE_SECRET
                   break
               case EActionTokenType.forgot:
                   secret = configs.JWT_FORGOT_SECRET
                   break
           }
           return jwt.sign(payload,secret,{expiresIn:'7d'})
    }

    public checkActionToken(token:string,tokenType:EActionTokenType){
        try {
            let secret = ""
            switch (tokenType) {
                case EActionTokenType.activate:
                    secret = configs.JWT_ACTIVATE_SECRET
                    break
                case EActionTokenType.forgot:
                    secret = configs.JWT_FORGOT_SECRET
                    break
            }
            return jwt.verify(token,secret) as IActionTokenPayload
        }catch (e) {
            throw new ApiError("Token not valid",401)
        }
    }

}

export const tokenService = new TokenService()
