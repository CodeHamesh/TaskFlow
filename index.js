const express = require('express');
const app = express();
require("dotenv").config()
const path = require("path")
const ejsMate = require("ejs-mate")
const mongoose = require('mongoose')
const userRouter = require("./routes/user.js")
const taskflowRouter = require('./routes/taskflow.js');
const session = require('express-session');
const flash = require("connect-flash");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const protectRoute = require('./services/protectRoute.js');
const User = require("./models/user.js");
let PORT = process.env.PORT
let MONGO_URL = process.env.MONGO_URL
const methodOverride = require('method-override')
mongoose.connect(MONGO_URL).then(()=> console.log(`mongoDB connect`)
).catch((err)=>{console.log(`mongoDB Error ${err}`)
})
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname,"views"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:process.env.SESSION,
    resave:flash,
    saveUninitialized:true
}))

app.use(flash())
app.use(cookieParser())
app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    console.log(req.flash('success'));
    next()
})

app.use((req, res, next) => {
        try {
          const token = req.cookies.token;
          if (!token) {
            res.locals.userInfo = null; // No user
            return next(); // Continue to next middleware
          } else {
            let decodeData = jwt.verify(token, process.env.JWT);
            req.userInfo = decodeData;
            res.locals.userInfo = req.userInfo; // Store user info in res.locals
            console.log("locals",res.locals);
            
            next();
          }
        } catch (err) {
          next(err);
        }
      });

app.get('/',(req,res)=>{
    res.render("taskFlow.ejs",{title:"TaskFlow"})
})

app.use("/taskflow",taskflowRouter)
app.use('/user', userRouter)

app.use((req,res)=>{
 return res.render("err.ejs")
})
app.use((err,req,res,next)=>{
    let {status = 500 , message= 'somthing error'}= err
    res.status(status).render('mainerr.ejs',{title:"Error",msg:message})
    next(err)
})

app.listen(PORT,()=>{
    console.log(`App Listen PORT ${process.env.PORT}`);
})



