import express from "express"
import cors from "cors"
import {configs} from "./configs/config";
import * as mongoose from "mongoose"
import {authRouter} from "./routers/auth.router";
import {userRouter} from "./routers/user.router";
import {requestsRouter} from "./routers/requests.router";
import {moderatorRouter} from "./routers/moderator.router";
import {adminRouter} from "./routers/admin.router";
import {repairerRouter} from "./routers/repairer.router";
import {cronRunner} from "./cron/cron.runner";


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/requests",requestsRouter)
app.use("/moderator",moderatorRouter)
app.use("/admin",adminRouter)
app.use("/repairer",repairerRouter)

app.listen(configs.PORT,async ()=>{
    await mongoose.connect(configs.BASE_URL)
    cronRunner()
    console.log(`Server is started on ${configs.PORT}`)
})