const router = require('express').Router()
const protectRoute = require('../services/protectRoute');
const User = require("../models/user.js");
const {taskVali} = require("../services/signupVali.js");

router.get("/add",protectRoute,async(req,res,next)=>{
    try {
      let allTasks =  await User.findById(req.userInfo.id)
     res.render("tasks.ejs",{title:"Tasks",allTasks:allTasks.tasks})
    } catch (error) {
       next(error)
    }
})
router.post("/add",taskVali, async(req,res,next)=>{
    try {
     let {title,task} = req.body
   let findUser = await User.findOne({_id:req.userInfo.id})
   findUser.tasks.push({title:title,task:task})
   await findUser.save()
   req.flash("success","Your Task Add")
    res.redirect("/taskflow/add")
    } catch (err) {
     next(err)
    }
  })
 router.delete("/add/:userId/:id/delete",async(req,res,next)=>{
    try {
      let user = await User.findById(req.params.userId);
      if (user) {
          user.tasks.pull({ _id: req.params.id });
          await user.save(); 
          return res.redirect('/taskflow/add')
      }
  } catch (err) {
      next(err)
  }
  })

module.exports = router