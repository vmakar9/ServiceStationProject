import {config} from "dotenv";
config()
export const configs={
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

    JWT_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,

    NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASSWORD: process.env.NO_REPLAY_EMAIL_PASSWORD,

    FRONT_URL: process.env.FRONT_URL,

    SALT:+process.env.SALT

}