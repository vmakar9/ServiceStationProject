import {IUser} from "./user.type";

export interface ITokenPair{
    accessToken:string;
    refreshToken:string;
}

export type ITokenPayload = Pick<IUser, "_id"| "role">

export type IActionTokenPayload = Pick<IUser, "_id">