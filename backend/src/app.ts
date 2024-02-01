import express from "express"
import cors from "cors"
import {configs} from "./configs/config";
import * as mongoose from "mongoose"
import {authRouter} from "./routers/auth.router";


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/auth",authRouter)

app.listen(configs.PORT,async ()=>{
    await mongoose.connect(configs.BASE_URL)
    console.log(`Server is started on ${configs.PORT}`)
})