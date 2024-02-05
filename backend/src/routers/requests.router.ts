import {Router} from "express";
import {requestController} from "../controller/requests.controller";
import {requestMiddleware} from "../middleware/request.middleware";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router()

router.get("/",
    requestController.getAll)

router.post("/",
    authMiddleware.checkAccessToken,
    requestController.create)

router.get("/:requestId",
    requestMiddleware.getByIdOrThrow,
    requestController.getById)

router.patch("/:requestId",
    authMiddleware.checkAccessToken,
    requestMiddleware.getByIdOrThrow,
    requestController.update)

router.delete("/:requestId",
    authMiddleware.checkAccessToken,
    requestMiddleware.getByIdOrThrow,
    requestController.delete)

export const requestsRouter = router