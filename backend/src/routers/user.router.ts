import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {userController} from "../controller/user.controller";

const router = Router()

router.get("/me",
    authMiddleware.checkAccessToken,
    userController.getMe)

router.patch("/me",
    authMiddleware.checkAccessToken,
    userController.updateMe)

router.delete("/me",
    authMiddleware.checkAccessToken,
    userController.deleteMe)

export const userRouter= router