import bcrypt from "bcrypt"
import {configs} from "../configs/config";
class PasswordService{
    public async hash(password:string):Promise<string>{
        return bcrypt.hash(password,configs.SALT)
    }
    public async compare(password:string,hashedPassword:string):Promise<boolean>{
        return bcrypt.compare(password,hashedPassword)
    }

}

export const passwordService = new PasswordService()