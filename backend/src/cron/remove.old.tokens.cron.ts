import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { CronJob} from "cron"

import {Token} from "../models/token.model";


dayjs.extend(utc)

const tokenRemover= async ():Promise<void>=>{
    const previousMonth = dayjs().utc().subtract(1,"month")

    await Token.deleteMany({created:{$lte:previousMonth}})
}

export const removeOldTokens= new CronJob("0 0 * * *",tokenRemover)