import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { CronJob} from "cron"
import {RepairToken} from "../models/repair-token.model";

dayjs.extend(utc)

const removeOldRepairsTokens=async ():Promise<void>=>{
    const previousMonth = dayjs().utc().subtract(1,"month")

    await RepairToken.deleteMany({created:{$lte:previousMonth}})
}

export const removeOldRepairsToken = new CronJob("0 0 * * *",removeOldRepairsTokens)