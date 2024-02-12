import {IUser} from "./user.type";
import {IRepairer} from "./repairer.type";

export interface ITokenPair{
    accessToken:string;
    refreshToken:string;
}

export interface ITokenRepairPair{
    accessRepairToken:string;
    refreshRepairToken:string;
}

export type ITokenPayload = Pick<IUser, "_id"| "role">

export type ITokenRepairPayload = Pick<IRepairer, "_id"| "speciality">

export type IActionTokenPayload = Pick<IUser, "_id"|"role">