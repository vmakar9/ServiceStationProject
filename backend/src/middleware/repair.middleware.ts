
import {NextFunction, Request, Response} from "express";
import {ApiError} from "../error/api.error";
import {IRepairer} from "../types/repairer.type";
import {Repairer} from "../models/repairer.model";

class RepairMiddleware{
    public getDynamicallyAndThrow(
        fieldName: string,
        from: "body" | "query" | "params" = "body",
        dbField: keyof IRepairer = "cooperative_email"
    ) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const fieldValue = req[from][fieldName];

                const repairer = await Repairer.findOne({ [dbField]: fieldValue });

                if (repairer) {
                    throw new ApiError(
                        `Repairer with ${fieldName} ${fieldValue} already exist`,
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
        dbField: keyof IRepairer = "cooperative_email"
    ) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const fieldValue = req[from][fieldName];

                const repairer = await Repairer.findOne({ [dbField]: fieldValue });

                if (!repairer) {
                    throw new ApiError(`Repairer not found`, 422);
                }

                req.res.locals = { repairer };

                next();
            } catch (e) {
                next(e);
            }
        };

    }
}

export const repairMiddleware = new RepairMiddleware()