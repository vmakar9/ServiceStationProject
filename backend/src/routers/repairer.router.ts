import {Router} from "express"
import {authMiddleware} from "../middleware/auth.middleware";
import {accessMiddleware} from "../middleware/access.middleware";
import {repairerController} from "../controller/repairer.controller";
import {repairMiddleware} from "../middleware/repair.middleware";

const router = Router()

router.post('/createRepairer',
    authMiddleware.checkAccessToken,
    accessMiddleware.IsUserAdmin,
    repairerController.createRepairer)

router.post('/loginRepairer',
    repairMiddleware.getDynamicallyOrThrow("cooperative_email"),
    repairerController.repairerLogin)

router.post('/refreshRepairer',
    authMiddleware.checkRefreshRepairToken,
    repairerController.refreshRepairer)

router.get('/RepairerMe',
    authMiddleware.checkAccessRepairToken,
    repairerController.getRepairerMe)

router.patch('/RepairerMe',
    authMiddleware.checkAccessRepairToken,
    repairerController.updateRepairerMe)


export const repairerRouter = router