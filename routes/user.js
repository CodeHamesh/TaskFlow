const router = require("express").Router()
const express = require("express");
const User = require("../models/user.js");
const ExpressError = require("../services/ExpressError.js");
const {validateSignup} = require("../services/signupVali.js");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

router.get("/signup",(req,res,next)=>{
    res.render("signup.ejs",{title:"SignUp"})
})
router.post("/signup",validateSignup,async(req,res,next)=>{
    try {
        let {name,username,email,password} = req.body
    let findUser = await User.findOne({$and:[{username},{email}]})
    if (findUser) {
        next(new ExpressError(401,"User already registerd"))
    }
    let hashPassword = bcrypt.hashSync(password,10)
    let addUser = new User({
        name,
        username,
        email,
        password:hashPassword
    })
    await addUser.save()
    req.flash('success','Signup success plz login')
    return res.redirect('/')
    } catch (err) {
        next(err)
    } 
})

router.get("/login",(req,res,next)=>{
    res.render("login.ejs",{title:"Login"})
})

router.post("/login",async(req,res,next)=>{
  try {
    let {username,password} = req.body
    let findUser = await User.findOne({username});
    if (!findUser) {
        req.flash("success","User is not registered. Please register then login")
        return res.redirect("/")
    }
   let findPass =  bcrypt.compareSync(password, findUser.password);
   if (!findPass) {
      req.flash("success","please enter a valid password")
      return res.redirect("/user/login")
   }else{
    let token = jwt.sign({id:findUser._id,name:findUser.name,username:findUser.username},process.env.JWT)
    res.cookie("token",token,{ httpOnly: true, secure: true})
    req.flash("success","Login successfull")
    return res.redirect("/")
   }
  } catch (err) {
    next(err)
  }
})

router.get("/logout",(req,res,next)=>{
      res.clearCookie('token')
      return res.redirect("/")
     
})




module.exports = router