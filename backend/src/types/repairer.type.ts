import {Types} from "mongoose";

export interface IRepairer{
    _id:Types.ObjectId,
    name:string,
    surname:string,
    speciality:string,
    experience:string,
    cooperative_email:string,
    cooperative_password:string
}