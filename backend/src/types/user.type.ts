import {Document} from "mongoose"
export interface IUser extends Document{
    name:string,
    surname:string,
    email:string,
    password:string,
    role:string,
    status:string
}