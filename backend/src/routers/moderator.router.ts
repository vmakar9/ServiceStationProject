import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {accessMiddleware} from "../middleware/access.middleware";
import {moderatorController} from "../controller/moderator.controller";
import {userMiddleware} from "../middleware/user.middleware";

const router = Router()

router.get('/banlist/users',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdminOrModerator,
    moderatorController.getBanedUser)

router.get('/users',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdminOrModerator,
    moderatorController.getAll)

router.patch('/banlist/ban/:userId',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdminOrModerator,
    userMiddleware.getByIdOrThrow,
    moderatorController.banUser)

router.patch('/banlist/unban/:userId',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdminOrModerator,
    userMiddleware.getByIdOrThrow,
    moderatorController.unBanUser)

export const moderatorRouter = router