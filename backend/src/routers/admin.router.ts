import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {accessMiddleware} from "../middleware/access.middleware";
import {userMiddleware} from "../middleware/user.middleware";
import {adminController} from "../controller/admin.controller";

const router = Router()

router.get('/banlist/users',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdmin,
    adminController.getBanedUser)

router.get('/users',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdmin,
    adminController.getAll)

router.patch('/banlist/ban/:userId',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdmin,
    userMiddleware.getByIdOrThrow,
    adminController.banUser)

router.patch('/banlist/unban/:userId',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdmin,
    userMiddleware.getByIdOrThrow,
    adminController.unBanUser)

router.patch('/changeRole/:userId',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdmin,
    userMiddleware.getByIdOrThrow,
    adminController.changeRole)

router.delete('/deleteUser/:userId',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdmin,
    userMiddleware.getByIdOrThrow,
    adminController.deleteUser)

export const adminRouter = router