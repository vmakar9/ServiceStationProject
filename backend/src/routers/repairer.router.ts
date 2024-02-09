import {Router} from "express"
import {authMiddleware} from "../middleware/auth.middleware";
import {accessMiddleware} from "../middleware/access.middleware";
import {repairerController} from "../controller/repairer.controller";

const router = Router()

router.post('/createRepairer',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdmin,
    repairerController.createRepairer)

export const repairerRouter = router