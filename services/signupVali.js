const joi = require('joi')
const ExpressError = require('./ExpressError')


let signupSchema = joi.object({
    name: joi.string()
    .required(),
    username:joi.string()
    .max(30)
    .required(),
    email:joi.string().email().required(),
    password:joi.string().trim().required().min(3).max(20)
})

function validateSignup(req,res,next) {
   let {error} = signupSchema.validate(req.body)
   if (error) {
       next(new ExpressError(401,error))
   }else{
    next()
   }
}



let taskSchema = joi.object({
    title:joi.string().required(),
    task:joi.string().required()
})

function taskVali(req,res,next) {
   let {error}= taskSchema.validate(req.body)
   if (error) {
      next(new ExpressError(401,error.details[0].message))
   }else{
    next()
   } 
}

module.exports = {
    validateSignup,
    taskVali
}