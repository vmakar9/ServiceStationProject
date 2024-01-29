import {EEmailAction} from "../enum/email.enum";

export const allTemplates:{
    [key:string]:{subject:string,templateName:string}
}={
    [EEmailAction.WELCOME]:{
        subject:"Well come to our service station",
        templateName:"register"
    },
    [EEmailAction.FORGOT_PASSWORD]:{
        subject:"Oh no you forgot your password",
        templateName:"forgotPassword"
    },
    [EEmailAction.ACTIVATE]:{
        subject:"Activate your account",
        templateName:"activate"
    }
}