import { Types} from "mongoose";
import {IUser} from "./user.type";

export interface IRequest {
    _id?:Types.ObjectId,
    title:string,
    car_brand:string,
    model:string,
    year:number,
    problem:string,
    additional_information:string,
    status:string,
    createdAt:Date,
    creator: IUser | Types.ObjectId
}