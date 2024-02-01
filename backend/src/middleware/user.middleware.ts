import {IUser} from "../types/user.type";
import {Request,Response,NextFunction} from "express";
import {User} from "../models/user.model";
import {ApiError} from "../error/api.error";

class UserMiddleware{
    public getDynamicallyAndThrow(
        fieldName: string,
        from: "body" | "query" | "params" = "body",
        dbField: keyof IUser = "email"
    ) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const fieldValue = req[from][fieldName];

                const user = await User.findOne({ [dbField]: fieldValue });

                if (user) {
                    throw new ApiError(
                        `User with ${fieldName} ${fieldValue} already exist`,
                        409
                    );
                }

                next();
            } catch (e) {
                next(e);
            }
        };
    }
    public getDynamicallyOrThrow(
        fieldName: string,
        from: "body" | "query" | "params" = "body",
        dbField: keyof IUser = "email"
    ) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const fieldValue = req[from][fieldName];

                const user = await User.findOne({ [dbField]: fieldValue });

                if (!user) {
                    throw new ApiError(`User not found`, 422);
                }

                req.res.locals = { user };

                next();
            } catch (e) {
                next(e);
            }
        };

    }
}

export const userMiddleware = new UserMiddleware()