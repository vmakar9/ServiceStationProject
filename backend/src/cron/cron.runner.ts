import {removeOldTokens} from "./remove.old.tokens.cron";
import {removeOldRepairsToken} from "./remove.old.repairs.tokens.cron";

export const cronRunner=()=>{
    removeOldTokens.start();
    removeOldRepairsToken.start();
}

